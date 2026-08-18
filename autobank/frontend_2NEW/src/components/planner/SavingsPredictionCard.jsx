import { formatCurrency } from "../../utils/formatCurrency";
import ProgressBar from "../common/ProgressBar.jsx";

export default function SavingsPredictionCard({ summary }) {
  const { income, totalExpense, savings, savingsRate } = summary;
  const tone = savings < 0 ? "brick" : savingsRate < 15 ? "amber" : "";

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 12 }}>Your savings this month</h3>
      <div className="row-between" style={{ marginBottom: 6 }}>
        <span className="text-soft" style={{ fontSize: 13 }}>Income</span>
        <span className="amt">{formatCurrency(income)}</span>
      </div>
      <div className="row-between" style={{ marginBottom: 6 }}>
        <span className="text-soft" style={{ fontSize: 13 }}>Total expenses</span>
        <span className="amt">{formatCurrency(totalExpense)}</span>
      </div>
      <div className="row-between" style={{ marginBottom: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>Net savings</span>
        <span className="amt-lg" style={{ fontSize: 22, color: savings < 0 ? "var(--brick)" : "var(--ledger-green)" }}>
          {savings < 0 ? "−" : ""}{formatCurrency(Math.abs(savings))}
        </span>
      </div>
      <ProgressBar value={Math.max(0, savingsRate)} max={100} tone={tone} />
      <p className="text-faint" style={{ fontSize: 11.5, marginTop: 6 }}>
        {savings < 0
          ? "You're spending more than you earn — see the recommendations below to fix this."
          : `You're saving ${savingsRate}% of your income each month.`}
      </p>
    </div>
  );
}
