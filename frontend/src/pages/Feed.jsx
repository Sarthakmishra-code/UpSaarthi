import { useEffect, useState } from "react";
import api from "../services/api";
import CreatePost from "../components/feed/CreatePost";
import PostCard from "../components/feed/PostCard";
import Loader from "../components/common/Loader";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/questions");
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

      {loading && <Loader text="Loading questions..." />}

      {!loading &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
    </div>
  );
}
