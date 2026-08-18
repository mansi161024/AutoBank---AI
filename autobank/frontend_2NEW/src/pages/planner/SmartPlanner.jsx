import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlanner } from "../../hooks/usePlanner";
import SalaryExpenseForm from "../../components/planner/SalaryExpenseForm.jsx";
import SavingsPredictionCard from "../../components/planner/SavingsPredictionCard.jsx";
import ExpensePredictionCard from "../../components/planner/ExpensePredictionCard.jsx";
import SavingsAdviceCard from "../../components/planner/SavingsAdviceCard.jsx";
import Button from "../../components/common/Button.jsx";

export default function SmartPlanner() {
  const { salary, prediction, savingsSummary } = usePlanner();

  return (
    <div className="stack gap-24">
      <div className="planner-hero">
        <span className="eyebrow">Smart Money Planner</span>
        <h2><Calculator size={20} style={{ verticalAlign: -3, marginRight: 8 }} />Salary in, expenses out, savings figured out</h2>
        <p style={{ color: "#c3c9e6", fontSize: 13.5, marginTop: 10, maxWidth: 560 }}>
          Enter your salary and what you actually spend on rent, groceries, car insurance, and
          bills. AutoBank AI predicts what each should cost, works out what you're really saving,
          and tells you what to do with it next.
        </p>
      </div>

      <div className="grid grid-2">
        <SalaryExpenseForm />
        <div className="stack gap-16">
          <SavingsPredictionCard summary={savingsSummary} />
          <SavingsAdviceCard prediction={prediction} summary={savingsSummary} />
        </div>
      </div>

      <ExpensePredictionCard prediction={prediction} salary={salary} />

      {savingsSummary.savings > 0 && (
        <div className="card row-between" style={{ borderColor: "var(--ledger-green)", background: "var(--ledger-green-light)" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14.5 }}>You have surplus to put to work</div>
            <div className="text-soft" style={{ fontSize: 13 }}>See where to invest it for the best return.</div>
          </div>
          <Link to="/planner/invest" className="btn btn-primary">Invest my savings</Link>
        </div>
      )}
    </div>
  );
}
