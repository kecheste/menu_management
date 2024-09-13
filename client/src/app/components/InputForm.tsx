import React from "react";

function InputForm({
  text,
  type,
  placeholder,
  value,
}: {
  text: string;
  type: string;
  placeholder: string;
  value?: string;
}) {
  return (
    <li className="flex flex-col gap-2 text-gray-500 text-sm">
      <p>{text}</p>
      <input
        type={type}
        required
        className="text-gray-700 bg-gray-100 px-4 py-2 rounded-xl border-none outline-none"
        placeholder={placeholder}
        value={value}
      />
    </li>
  );
}

export default InputForm;
