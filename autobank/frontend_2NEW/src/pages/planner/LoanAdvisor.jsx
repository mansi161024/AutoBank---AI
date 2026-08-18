import { useState } from "react";
import { BadgeIndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlanner } from "../../hooks/usePlanner";
import { adviseOnLoan } from "../../utils/calculations";
import { loanOffers, activeLoans } from "../../data/loans";
import LoanRequestForm from "../../components/planner/LoanRequestForm.jsx";
import LoanAdvisorPanel from "../../components/planner/LoanAdvisorPanel.jsx";

export default function LoanAdvisor() {
  const { salary, expenses } = usePlanner();
  const [request, setRequest] = useState(null);

  const existingEmi = activeLoans.reduce((s, l) => s + l.emi, 0);

  const result = request
    ? adviseOnLoan({
        salary,
        expenses,
        existingEmi,
        requestedAmount: request.amount,
        tenureMonths: request.tenure,
        offers: loanOffers,
      })
    : { ranked: [], best: null, affordability: { score: 0, disposable: 0, ratio: 0 } };

  return (
    <div className="stack gap-24">
      <div className="page-head">
        <div>
          <h1><BadgeIndianRupee size={22} style={{ verticalAlign: -3, marginRight: 8 }} />Loan advisor</h1>
          <p className="sub">Checks any new loan against every expense you've entered — ghar kharch, rent, insurance, bills — and finds the best rate.</p>
        </div>
      </div>

      {!salary && (
        <div className="card" style={{ borderColor: "var(--marigold)" }}>
          <p className="text-soft" style={{ fontSize: 13.5 }}>
            Tip: add your salary and expenses on the <Link to="/planner" style={{ fontWeight: 600 }}>Salary & Expenses</Link> page
            first for an accurate affordability check.
          </p>
        </div>
      )}

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <LoanRequestForm onSubmit={(amount, tenure) => setRequest({ amount, tenure })} />
        <div>
          {request ? (
            <LoanAdvisorPanel result={result} requestedAmount={request.amount} tenureMonths={request.tenure} />
          ) : (
            <div className="card empty-state">
              <h3>Enter a loan amount to compare</h3>
              <p>We'll rank every offer and check what it does to your monthly budget.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
