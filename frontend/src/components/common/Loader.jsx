export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex items-center gap-2 text-gray-600">
        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
}
