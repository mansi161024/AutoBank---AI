import { formatCurrency } from "../../utils/formatCurrency";
import Input from "../common/Input.jsx";
import Badge from "../common/Badge.jsx";

export default function JobLossTracker({ bankBalance, setBankBalance, expenses, survivalPlan }) {
  const { balance, essentialMonthlySpend, runwayMonths, suggestedDailyBudget } = survivalPlan;
  const tone = runwayMonths >= 6 ? "green" : runwayMonths >= 3 ? "amber" : "red";

  return (
    <div className="stack gap-16">
      <div className="card" style={{ borderColor: "var(--brick)" }}>
        <h3 className="card-title" style={{ marginBottom: 4 }}>No salary right now? Track off your balance instead.</h3>
        <p className="text-faint" style={{ fontSize: 12, marginBottom: 14 }}>
          If you've left or lost your job, enter what's currently in your bank account. We'll track
          your essential expenses against that balance instead of a salary.
        </p>
        <Input
          label="Current bank balance (₹)"
          type="number"
          placeholder="e.g. 96500"
          value={bankBalance}
          onChange={(e) => setBankBalance(e.target.value)}
        />
      </div>

      <div className="card runway-meter">
        <span className="eyebrow">Your money will last</span>
        <div className="num" style={{ color: `var(--${tone === "red" ? "brick" : tone === "amber" ? "marigold" : "ledger-green"})` }}>
          {balance ? runwayMonths : "—"}
        </div>
        <div className="unit">months at essential-only spending</div>
        {balance > 0 && <Badge tone={tone} style={{ marginTop: 10 }}>{formatCurrency(balance)} remaining</Badge>}
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 10 }}>Essential monthly expenses used for this calculation</h3>
        <div className="row-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--hairline)" }}>
          <span className="text-soft" style={{ fontSize: 13 }}>Home rent, groceries, insurance, bills, transport</span>
          <span className="amt">{formatCurrency(essentialMonthlySpend)}/mo</span>
        </div>
        <div className="row-between" style={{ padding: "8px 0" }}>
          <span className="text-soft" style={{ fontSize: 13 }}>Suggested daily budget in survival mode</span>
          <span className="amt">{formatCurrency(suggestedDailyBudget)}/day</span>
        </div>
        <p className="text-faint" style={{ fontSize: 11.5, marginTop: 10 }}>
          These figures come from the expenses you entered on the Salary & Expenses page — update them there any time.
        </p>
      </div>
    </div>
  );
}
