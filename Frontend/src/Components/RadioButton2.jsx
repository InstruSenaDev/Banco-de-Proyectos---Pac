import React from 'react';

const RadioButton2 = ({ Text, id, name }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        className="form-radio h-5 w-5 focus:ring-red-600"
      />
      <label htmlFor={id} className="ml-2 text-sm font-josefin-slab">
        {Text}
      </label>
    </div>
  );
};

export default RadioButton2;
