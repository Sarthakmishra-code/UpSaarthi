import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, isExpert } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!isExpert) return <Navigate to="/" />;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Expert Profile</h1>
      {/* Expert info */}
    </div>
  );
}
