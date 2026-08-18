import { formatCurrency } from "../../utils/formatCurrency";
import Badge from "../common/Badge.jsx";

export default function ExpensePredictionCard({ prediction, salary }) {
  if (!salary) {
    return (
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 8 }}>Predicted expenses</h3>
        <p className="text-soft" style={{ fontSize: 13.5 }}>Enter your salary to see a predicted, guideline-based budget for rent, groceries, insurance, and bills.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 4 }}>Predicted expenses from your salary</h3>
      <p className="text-faint" style={{ fontSize: 12, marginBottom: 12 }}>Based on typical spend guidelines for your income level.</p>
      {prediction.map((p) => (
        <div className="predict-row" key={p.key}>
          <span className="predict-label">{p.label}</span>
          <div className="predict-amts">
            <span><span className="k">Predicted</span>{formatCurrency(p.recommended)}</span>
            {p.actual > 0 && <span><span className="k">You spend</span>{formatCurrency(p.actual)}</span>}
          </div>
          {p.status === "over" && <Badge tone="red">₹{p.diff.toLocaleString("en-IN")} over</Badge>}
          {p.status === "within" && <Badge tone="green">Within guideline</Badge>}
          {p.status === "unset" && <Badge tone="neutral">Not entered</Badge>}
        </div>
      ))}
    </div>
  );
}
