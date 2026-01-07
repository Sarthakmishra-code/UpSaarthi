export default function ExpertCard({ expert }) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-bold">{expert.name}</h3>
      <p className="text-sm text-gray-600">{expert.domain}</p>
      <button className="mt-2 text-indigo-600">View Profile</button>
    </div>
  );
}
