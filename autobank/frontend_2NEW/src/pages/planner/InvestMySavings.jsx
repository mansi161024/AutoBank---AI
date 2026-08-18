import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlanner } from "../../hooks/usePlanner";
import EmergencyFundSlider from "../../components/planner/EmergencyFundSlider.jsx";
import InvestmentPlanCard from "../../components/planner/InvestmentPlanCard.jsx";
import { formatCurrency } from "../../utils/formatCurrency";

export default function InvestMySavings() {
  const { salary, savingsSummary, emergencyFundMonths, setEmergencyFundMonths, investmentPlan } = usePlanner();

  if (!salary) {
    return (
      <div className="stack gap-24">
        <div className="page-head"><h1><TrendingUp size={22} style={{ verticalAlign: -3, marginRight: 8 }} />Invest my savings</h1></div>
        <div className="card empty-state">
          <span className="eyebrow">Set up your budget first</span>
          <h3>We need your salary & expenses</h3>
          <p>Head to Salary & Expenses to enter your numbers — we'll calculate your surplus and where to put it here.</p>
          <div style={{ marginTop: 16 }}><Link to="/planner" className="btn btn-primary btn-sm">Enter salary & expenses</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack gap-24">
      <div className="page-head">
        <div>
          <h1><TrendingUp size={22} style={{ verticalAlign: -3, marginRight: 8 }} />Invest my savings</h1>
          <p className="sub">
            {savingsSummary.savings > 0
              ? `You have ${formatCurrency(savingsSummary.savings)}/month left over — here's where it should go.`
              : "You don't have a surplus yet — fix your expenses first on the Salary & Expenses page."}
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <EmergencyFundSlider months={emergencyFundMonths} onChange={setEmergencyFundMonths} />
        <InvestmentPlanCard plan={investmentPlan} />
      </div>
    </div>
  );
}
