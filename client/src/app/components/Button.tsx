import React from "react";

function Button({ text }: { text: string }) {
  return (
    <button className="text-white bg-blue-600 rounded-full px-4 py-2 outline-none">
      {text}
    </button>
  );
}

export default Button;
