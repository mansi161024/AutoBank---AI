export default function EmergencyFundSlider({ months, onChange }) {
  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 10 }}>Emergency fund coverage</h3>
      <p className="text-soft" style={{ fontSize: 13, marginBottom: 12 }}>
        How many months of expenses do you currently have saved? This changes how we split your
        investment plan — building the safety net comes first.
      </p>
      <input
        type="range" min="0" max="12" step="0.5" value={months}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      <div className="row-between">
        <span className="text-faint" style={{ fontSize: 11.5 }}>0 months</span>
        <span className="amt" style={{ fontSize: 13 }}>{months} months saved</span>
        <span className="text-faint" style={{ fontSize: 11.5 }}>12 months</span>
      </div>
    </div>
  );
}
