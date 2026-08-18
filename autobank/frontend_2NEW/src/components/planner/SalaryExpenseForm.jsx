import { usePlanner } from "../../hooks/usePlanner";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { EXPENSE_LABELS } from "../../utils/calculations";

export default function SalaryExpenseForm() {
  const { salary, setSalary, expenses, updateExpense, resetPlanner } = usePlanner();

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 16 }}>Your salary & monthly expenses</h3>

      <Input
        label="Monthly salary income (₹)"
        type="number"
        placeholder="e.g. 78000"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <div className="input-hint" style={{ marginBottom: 12 }}>
        Enter what you actually spend — ghar kharch, home rent, car insurance, and bills. We'll
        predict what each should cost from your salary and flag anything you're overspending on.
      </div>

      {Object.keys(EXPENSE_LABELS).map((key) => (
        <div className="expense-input-row" key={key}>
          <Input
            label={EXPENSE_LABELS[key]}
            type="number"
            placeholder="0"
            value={expenses[key]}
            onChange={(e) => updateExpense(key, e.target.value)}
          />
        </div>
      ))}

      <Button variant="ghost" size="sm" onClick={resetPlanner} style={{ marginTop: 4 }}>Clear all</Button>
    </div>
  );
}
