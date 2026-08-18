import AIRecommendation from "../ai/AIRecommendation.jsx";

// Item 7: dynamic savings advice built from what the user actually entered.
export default function SavingsAdviceCard({ prediction, summary }) {
  const overspendCategories = prediction.filter((p) => p.status === "over");
  const tips = [];

  if (summary.income === 0) {
    tips.push("Enter your salary above to get personalised savings advice.");
  } else if (summary.savings < 0) {
    tips.push("You're spending more than you earn. Start by trimming the categories flagged as 'over' below — even a 10% cut across them turns this positive.");
  } else if (summary.savingsRate < 15) {
    tips.push(`You're saving ${summary.savingsRate}% of your income. Aim for at least 20% — try automating a fixed transfer to savings right when your salary lands.`);
  } else {
    tips.push(`Solid — you're saving ${summary.savingsRate}% of your income. Keep this up and consider directing more of the surplus into investments (see below).`);
  }

  overspendCategories.forEach((c) => {
    tips.push(`${c.label} is running ₹${c.diff.toLocaleString("en-IN")} above the typical guideline for your salary — worth a closer look.`);
  });

  return (
    <div className="card">
      <h3 className="card-title" style={{ marginBottom: 6 }}>How to save more</h3>
      {tips.map((t, i) => <AIRecommendation key={i} text={t} />)}
    </div>
  );
}
