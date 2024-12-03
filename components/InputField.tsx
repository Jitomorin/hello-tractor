import React from "react";

const InputField = ({ placeholder, type, value, onChange }: any) => {
  return (
    <input
      className="input_field"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
