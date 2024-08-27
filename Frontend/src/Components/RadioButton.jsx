import React from 'react';

const RadioButton = ({ Text }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id=""
        name="estado"
        className="form-radio h-5 w-5 focus:ring-lime-600 checked:bg-lime-400"
      />
      <label className="ml-2 text-sm font-josefin-slab">{Text}</label>
    </div>
  );
};

export default RadioButton;
