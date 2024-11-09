import React from 'react';

interface InputPorps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputPorps> = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4 flex p-4 m-3">
      <label className="p-2 m-1" htmlFor={name}>
        {label}{' '}
      </label>
      <input
        className="m-2 p-1"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};
export default Input;
