import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../common/Button";

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <p className="text-sm text-gray-500 text-center">
        Please login to ask a question.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/questions", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      // Notify Feed to refresh
      if (onPostCreated) {
        onPostCreated(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 mb-6 bg-white">
      <h3 className="font-semibold mb-3">Ask a Question</h3>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Describe your problem in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
        />

        <Button type="submit" loading={loading}>
          Post Question
        </Button>
      </form>
    </div>
  );
}
