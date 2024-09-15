import React from 'react';

const Input2 = ({ placeholder, type, Text, id, value, onChange }) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="font-josefin-slab font-semibold text-black text-left">
        {Text}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="bg-[#F5F6FA] w-full min-h-11 mt-2 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      />
    </div>
  );
};

export default Input2;
