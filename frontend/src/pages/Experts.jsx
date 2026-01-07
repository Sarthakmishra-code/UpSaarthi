import ExpertCard from "../components/experts/ExpertCard";

export default function Experts() {
  const experts = [
    { name: "Ex-Google Engineer", domain: "Web Development" },
    { name: "Retired Bank Manager", domain: "Finance" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {experts.map((e, i) => (
        <ExpertCard key={i} expert={e} />
      ))}
    </div>
  );
}
