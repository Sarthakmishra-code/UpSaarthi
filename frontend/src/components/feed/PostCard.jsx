import PostActions from "./PostAction";

export default function PostCard({ post }) {
  const [currentPost, setCurrentPost] = useState(post);

  return (
    <div className="border rounded p-4 mb-4 bg-white">
      <h3 className="font-semibold text-lg">{currentPost.title}</h3>
      <p className="text-gray-700 mt-1">{currentPost.description}</p>

      <PostActions
        post={currentPost}
        onAction={(updatedPost) => setCurrentPost(updatedPost)}
      />
    </div>
  );
}
