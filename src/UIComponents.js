import React from 'react';

export const Input = ({ type, value, onChange, placeholder, className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border rounded px-2 py-1 ${className}`}
  />
);

export const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    {children}
  </button>
);

export const Checkbox = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
  />
);

export const Select = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="border rounded px-2 py-1"
  >
    {children}
  </select>
);

export const SelectTrigger = ({ children }) => <div>{children}</div>;
export const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);