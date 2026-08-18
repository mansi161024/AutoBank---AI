export function calcEMI(principal, annualRatePct, tenureMonths) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

export function calcAffordabilityScore({ monthlyIncome, monthlyExpenses, existingEmi, newEmi }) {
  const disposable = monthlyIncome - monthlyExpenses - existingEmi;
  const ratio = (existingEmi + newEmi) / monthlyIncome;
  let score = Math.round(100 - ratio * 140);
  score = Math.max(5, Math.min(98, score));
  return { score, disposable, ratio: Math.round(ratio * 100) };
}

export function calcBudgetHealth(categories) {
  const total = categories.reduce((s, c) => s + c.limit, 0);
  const spent = categories.reduce((s, c) => s + c.spent, 0);
  return { total, spent, pct: total ? Math.round((spent / total) * 100) : 0 };
}

export function calcSurvivalRunway(savings, essentialMonthlySpend) {
  if (!essentialMonthlySpend) return 0;
  return Math.round((savings / essentialMonthlySpend) * 10) / 10;
}

export function calcFinancialHealthScore({ savingsRate, billsOnTimePct, debtToIncome, emergencyFundMonths }) {
  const s1 = Math.min(30, savingsRate * 1.2);
  const s2 = Math.min(25, (billsOnTimePct / 100) * 25);
  const s3 = Math.min(25, Math.max(0, 25 - debtToIncome * 0.6));
  const s4 = Math.min(20, emergencyFundMonths * 4);
  return Math.round(s1 + s2 + s3 + s4);
}

/* =========================================================================
   Smart Planner additions — salary-based expense prediction, savings,
   investment suggestions, loan advisor, and no-income survival tracking.
   Appended without touching any of the calculations above.
   ========================================================================= */

// Rule-of-thumb recommended spend as a % of monthly salary, per category.
// Used to PREDICT what a category "should" cost given a salary, and to
// flag categories where the user is spending more than the guideline.
export const RECOMMENDED_EXPENSE_PCT = {
  rent: 0.28, // ghar bhadu / home rent
  groceries: 0.14, // ghar kharch
  carInsurance: 0.03, // car insurance
  bills: 0.07, // electricity, phone, internet, other bill rent
  transport: 0.05,
  other: 0.05,
};

export const EXPENSE_LABELS = {
  rent: "Home Rent",
  groceries: "Ghar Kharch (Groceries)",
  carInsurance: "Car Insurance",
  bills: "Bills (Electricity/Phone/Internet)",
  transport: "Transport / Fuel",
  other: "Other",
};

// Predicts a recommended amount per category from salary, and compares it
// to what the user actually entered (if anything).
export function predictExpensesFromSalary(salary, actualExpenses = {}) {
  const s = Number(salary) || 0;
  return Object.keys(RECOMMENDED_EXPENSE_PCT).map((key) => {
    const recommended = Math.round(s * RECOMMENDED_EXPENSE_PCT[key]);
    const actual = Number(actualExpenses[key]) || 0;
    const over = actual > 0 ? actual - recommended : 0;
    return {
      key,
      label: EXPENSE_LABELS[key],
      recommended,
      actual,
      status: actual === 0 ? "unset" : over > 0 ? "over" : "within",
      diff: over,
    };
  });
}

export function sumExpenses(expenses = {}) {
  return Object.values(expenses).reduce((sum, v) => sum + (Number(v) || 0), 0);
}

// Core savings calculation: salary - total expenses.
export function calcMonthlySavings(salary, expenses = {}) {
  const income = Number(salary) || 0;
  const totalExpense = sumExpenses(expenses);
  const savings = income - totalExpense;
  const savingsRate = income ? Math.round((savings / income) * 100) : 0;
  return { income, totalExpense, savings, savingsRate };
}

// Splits monthly surplus into an investment plan. Prioritises building a
// 6-month emergency fund before allocating toward growth investments.
export function calcInvestmentPlan(surplus, emergencyFundMonths = 0) {
  const s = Math.max(0, Number(surplus) || 0);
  if (s === 0) {
    return { surplus: 0, allocations: [], note: "No surplus this month — nothing left to invest once expenses are covered." };
  }

  const needsEmergencyFund = emergencyFundMonths < 6;
  let allocations;

  if (needsEmergencyFund) {
    allocations = [
      { name: "Emergency Fund (liquid savings)", pct: 50, note: "Priority — you have less than 6 months of expenses saved." },
      { name: "Equity Mutual Fund SIP", pct: 30, note: "Long-term growth, 5+ year horizon." },
      { name: "Fixed Deposit / PPF", pct: 20, note: "Safe, stable, low-risk parking." },
    ];
  } else {
    allocations = [
      { name: "Equity Mutual Fund SIP", pct: 50, note: "Your emergency fund is healthy — push more toward growth." },
      { name: "Fixed Deposit / PPF / Bonds", pct: 30, note: "Balances the portfolio with safer, stable returns." },
      { name: "Liquid Fund (flexible access)", pct: 20, note: "Keep some cash accessible for opportunities or emergencies." },
    ];
  }

  return {
    surplus: s,
    allocations: allocations.map((a) => ({ ...a, amount: Math.round((a.pct / 100) * s) })),
    note: needsEmergencyFund
      ? "Building your emergency fund first keeps you safe if income ever stops."
      : "Emergency fund looks solid — this split leans toward long-term growth.",
  };
}

// Loan advisor: checks affordability against salary/expenses, then ranks
// a list of loan offers by lowest total payable (principal + interest) for
// the requested amount & tenure, returning the best pick with reasoning.
export function adviseOnLoan({ salary, expenses, existingEmi = 0, requestedAmount, tenureMonths, offers = [] }) {
  const monthlyExpenses = sumExpenses(expenses);
  const ranked = offers
    .map((offer) => {
      const emi = calcEMI(requestedAmount, offer.rate, tenureMonths);
      const totalPayable = emi * tenureMonths;
      const totalInterest = totalPayable - requestedAmount;
      return { ...offer, emi, totalPayable, totalInterest };
    })
    .sort((a, b) => a.totalPayable - b.totalPayable);

  const best = ranked[0];
  const afford = best
    ? calcAffordabilityScore({
        monthlyIncome: Number(salary) || 0,
        monthlyExpenses,
        existingEmi,
        newEmi: best.emi,
      })
    : { score: 0, disposable: 0, ratio: 0 };

  return { ranked, best, affordability: afford };
}

// Survival tracking for someone with no income: burns down a starting bank
// balance against monthly essential expenses and reports runway + a
// suggested monthly essentials-only budget.
export function calcNoIncomeSurvival(bankBalance, essentialExpenses = {}) {
  const balance = Number(bankBalance) || 0;
  const essentialMonthlySpend = sumExpenses(essentialExpenses);
  const runwayMonths = calcSurvivalRunway(balance, essentialMonthlySpend);
  const suggestedDailyBudget = essentialMonthlySpend ? Math.round((essentialMonthlySpend / 30) * 0.85) : 0;
  return { balance, essentialMonthlySpend, runwayMonths, suggestedDailyBudget };
}
