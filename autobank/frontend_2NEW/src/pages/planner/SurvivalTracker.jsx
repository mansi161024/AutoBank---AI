import { ShieldAlert } from "lucide-react";
import { usePlanner } from "../../hooks/usePlanner";
import JobLossTracker from "../../components/planner/JobLossTracker.jsx";

export default function SurvivalTracker() {
  const { employmentStatus, setEmploymentStatus, bankBalance, setBankBalance, expenses, survivalPlan } = usePlanner();

  return (
    <div className="stack gap-24">
      <div className="page-head">
        <div>
          <h1><ShieldAlert size={22} style={{ verticalAlign: -3, marginRight: 8 }} />No-income tracker</h1>
          <p className="sub">Left a job or lost your income? Switch tracking from salary to whatever's left in the bank.</p>
        </div>
      </div>

      <div className="job-toggle">
        <button className={employmentStatus === "employed" ? "active" : ""} onClick={() => setEmploymentStatus("employed")}>
          I have income
        </button>
        <button className={employmentStatus === "unemployed" ? "active" : ""} onClick={() => setEmploymentStatus("unemployed")}>
          I don't have income right now
        </button>
      </div>

      {employmentStatus === "employed" ? (
        <div className="card empty-state">
          <span className="eyebrow">You're set to "I have income"</span>
          <h3>Nothing to track here yet</h3>
          <p>Switch the toggle above to "I don't have income right now" to track your spending against your bank balance instead of a salary.</p>
        </div>
      ) : (
        <JobLossTracker
          bankBalance={bankBalance}
          setBankBalance={setBankBalance}
          expenses={expenses}
          survivalPlan={survivalPlan}
        />
      )}
    </div>
  );
}
