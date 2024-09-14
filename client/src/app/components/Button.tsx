import React from "react";

function Button({
  text,
  onClick,
  loading,
}: {
  text: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "text-white bg-blue-600 rounded-full px-4 py-2 outline-none hover:bg-blue-700 " +
        (loading ? "bg-blue-500" : "bg-blue-600")
      }
      disabled={loading}
    >
      {loading ? "..." : text}
    </button>
  );
}

export default Button;
