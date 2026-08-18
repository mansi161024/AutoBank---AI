import { formatCurrency } from "../../utils/formatCurrency";

export default function InvestmentPlanCard({ plan }) {
  if (!plan.allocations.length) {
    return (
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 8 }}>Where to invest your surplus</h3>
        <p className="text-soft" style={{ fontSize: 13.5 }}>{plan.note}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 4 }}>Where to invest your surplus</h3>
      <p className="text-faint" style={{ fontSize: 12, marginBottom: 10 }}>
        Suggested split for {formatCurrency(plan.surplus)} left over this month.
      </p>
      {plan.allocations.map((a) => (
        <div className="savings-split-row" key={a.name}>
          <div className="pct-pill">{a.pct}%</div>
          <div style={{ flex: 1 }}>
            <div className="row-between">
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</span>
              <span className="amt">{formatCurrency(a.amount)}</span>
            </div>
            <p className="text-faint" style={{ fontSize: 11.5, marginTop: 2 }}>{a.note}</p>
          </div>
        </div>
      ))}
      <p className="text-soft" style={{ fontSize: 12.5, marginTop: 12 }}>{plan.note}</p>
    </div>
  );
}
