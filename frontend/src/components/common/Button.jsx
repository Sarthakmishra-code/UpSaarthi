export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded bg-indigo-600 text-white
        hover:bg-indigo-700 transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
