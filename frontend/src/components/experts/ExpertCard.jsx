import { Link } from "react-router-dom";

export default function ExpertCard({ expert }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{expert.name}</h3>
      <p className="text-sm text-gray-600">{expert.domain}</p>

      <Link
        to={`/experts/${expert._id}`}
        className="inline-block mt-3 text-indigo-600 hover:underline"
      >
        View Profile
      </Link>
    </div>
  );
}
