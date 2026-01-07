import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AskQuestion() {
  const { user, isExpert } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (isExpert) return <p className="text-center mt-10">Experts cannot ask questions.</p>;

  return (
    <div>
      {/* Ask question form */}
    </div>
  );
}
