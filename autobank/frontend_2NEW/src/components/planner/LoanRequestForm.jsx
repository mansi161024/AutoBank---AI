import { useState } from "react";
import Input from "../common/Input.jsx";
import Select from "../common/Select.jsx";
import Button from "../common/Button.jsx";

export default function LoanRequestForm({ onSubmit }) {
  const [amount, setAmount] = useState("500000");
  const [tenure, setTenure] = useState("36");

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(Number(amount), Number(tenure));
      }}
    >
      <h3 className="card-title" style={{ marginBottom: 14 }}>How much do you want to borrow?</h3>
      <Input
        label="Loan amount (₹)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Select
        label="Tenure"
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
        options={[
          { value: "12", label: "12 months" },
          { value: "24", label: "24 months" },
          { value: "36", label: "36 months" },
          { value: "48", label: "48 months" },
          { value: "60", label: "60 months" },
        ]}
      />
      <Button variant="primary" block type="submit">Check affordability & compare</Button>
    </form>
  );
}
