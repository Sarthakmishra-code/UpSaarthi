import {
  Heart,
  MessageCircle,
  Repeat,
  Bookmark
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function PostActions({ post, onAction }) {
  const { user } = useAuth();

  const isLiked = post.likes?.includes(user?._id);
  const isBookmarked = post.bookmarks?.includes(user?._id);

  const handleAction = async (type) => {
    if (!user) return alert("Login required");

    try {
      const res = await api.post(`/questions/${post._id}/${type}`);
      onAction(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between text-sm text-gray-600 mt-3">

      {/* Like */}
      <button
        onClick={() => handleAction("like")}
        className={`flex items-center gap-1 ${
          isLiked ? "text-red-500" : ""
        }`}
      >
        <Heart size={16} />
        {post.likes?.length || 0}
      </button>

      {/* Comment */}
      <button className="flex items-center gap-1">
        <MessageCircle size={16} />
        {post.commentsCount || 0}
      </button>

      {/* Reshare */}
      <button
        onClick={() => handleAction("reshare")}
        className="flex items-center gap-1"
      >
        <Repeat size={16} />
        {post.resharedBy?.length || 0}
      </button>

      {/* Bookmark */}
      <button
        onClick={() => handleAction("bookmark")}
        className={`flex items-center gap-1 ${
          isBookmarked ? "text-indigo-600" : ""
        }`}
      >
        <Bookmark size={16} />
      </button>
    </div>
  );
}
