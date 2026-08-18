import { formatCurrency } from "../../utils/formatCurrency";
import Badge from "../common/Badge.jsx";

export default function LoanAdvisorPanel({ result, requestedAmount, tenureMonths }) {
  const { ranked, best, affordability } = result;

  if (!ranked.length) {
    return (
      <div className="card">
        <h3 className="card-title">Loan advisor</h3>
        <p className="text-soft" style={{ fontSize: 13.5, marginTop: 8 }}>
          Enter a loan amount and tenure to compare offers against your actual expenses.
        </p>
      </div>
    );
  }

  const scoreTone = affordability.score >= 65 ? "green" : affordability.score >= 35 ? "amber" : "red";
  const verdict =
    affordability.score >= 65
      ? "Comfortably affordable given your current expenses."
      : affordability.score >= 35
      ? "Manageable, but it will tighten your monthly budget."
      : "Risky — this EMI would eat heavily into your disposable income.";

  return (
    <div className="stack gap-16">
      <div className="best-loan-strip">
        <div>
          <span className="eyebrow">Best match for you</span>
          <div style={{ fontWeight: 700, fontSize: 18, marginTop: 4 }}>
            {best.bank} · {best.rate}% p.a.
          </div>
          <div className="text-soft" style={{ fontSize: 12.5, marginTop: 2 }}>
            EMI {formatCurrency(best.emi)}/mo for {tenureMonths} months on {formatCurrency(requestedAmount)}
          </div>
        </div>
        <Badge tone={scoreTone}>Affordability {affordability.score}/100</Badge>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 4 }}>Checked against everything you owe</h3>
        <p className="text-faint" style={{ fontSize: 12, marginBottom: 12 }}>
          Ghar kharch, home rent, car insurance, bills, and transport — all your entered expenses — plus this new EMI.
        </p>
        <div className="row-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--hairline)" }}>
          <span className="text-soft" style={{ fontSize: 13 }}>Disposable income after this EMI</span>
          <span className="amt">{formatCurrency(affordability.disposable)}</span>
        </div>
        <div className="row-between" style={{ padding: "8px 0" }}>
          <span className="text-soft" style={{ fontSize: 13 }}>EMI-to-income ratio</span>
          <span className="amt">{affordability.ratio}%</span>
        </div>
        <p className="text-soft" style={{ fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>{verdict}</p>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <h3 className="card-title" style={{ marginBottom: 12 }}>All offers, ranked by total cost</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--ink-faint)", fontSize: 11.5 }}>
              <th style={{ padding: "8px 6px" }}>Bank</th>
              <th style={{ padding: "8px 6px" }}>Rate</th>
              <th style={{ padding: "8px 6px" }}>EMI</th>
              <th style={{ padding: "8px 6px" }}>Total interest</th>
              <th style={{ padding: "8px 6px" }}></th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((l, i) => (
              <tr key={l.id} style={{ borderTop: "1px solid var(--hairline)" }}>
                <td style={{ padding: "10px 6px", fontWeight: 600 }}>{l.bank}</td>
                <td style={{ padding: "10px 6px" }} className="mono">{l.rate}%</td>
                <td style={{ padding: "10px 6px" }} className="mono">{formatCurrency(l.emi)}</td>
                <td style={{ padding: "10px 6px" }} className="mono">{formatCurrency(l.totalInterest)}</td>
                <td style={{ padding: "10px 6px" }}>{i === 0 && <Badge tone="green">Best</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
