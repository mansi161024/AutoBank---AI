import { createContext, useMemo, useState } from "react";
import {
  predictExpensesFromSalary,
  calcMonthlySavings,
  calcInvestmentPlan,
  calcNoIncomeSurvival,
} from "../utils/calculations";

export const PlannerContext = createContext(null);

const DEFAULT_EXPENSES = {
  rent: "",
  groceries: "",
  carInsurance: "",
  bills: "",
  transport: "",
  other: "",
};

export function PlannerProvider({ children }) {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [emergencyFundMonths, setEmergencyFundMonths] = useState(2.4);

  // Employment status drives whether the app plans off salary, or off a
  // shrinking bank balance for someone currently without income.
  const [employmentStatus, setEmploymentStatus] = useState("employed"); // "employed" | "unemployed"
  const [bankBalance, setBankBalance] = useState("");

  const updateExpense = (key, value) => {
    setExpenses((prev) => ({ ...prev, [key]: value }));
  };

  const resetPlanner = () => {
    setSalary("");
    setExpenses(DEFAULT_EXPENSES);
  };

  const prediction = useMemo(() => predictExpensesFromSalary(salary, expenses), [salary, expenses]);
  const savingsSummary = useMemo(() => calcMonthlySavings(salary, expenses), [salary, expenses]);
  const investmentPlan = useMemo(
    () => calcInvestmentPlan(savingsSummary.savings, emergencyFundMonths),
    [savingsSummary.savings, emergencyFundMonths]
  );
  const survivalPlan = useMemo(() => calcNoIncomeSurvival(bankBalance, expenses), [bankBalance, expenses]);

  return (
    <PlannerContext.Provider
      value={{
        salary,
        setSalary,
        expenses,
        updateExpense,
        setExpenses,
        resetPlanner,
        emergencyFundMonths,
        setEmergencyFundMonths,
        employmentStatus,
        setEmploymentStatus,
        bankBalance,
        setBankBalance,
        prediction,
        savingsSummary,
        investmentPlan,
        survivalPlan,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}
