import React from 'react';
import '../styles/RadioButton.css'

const RadioButton = ({Text, id}) => {
  return (
    <div className="flex items-center mr-[16px]">
      <input
        type="radio"
        id={id}
        name="estado"
        className="form-radio h-5 w-5 focus:ring-Verde checked:bg-Verde"
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-josefin-slab font-semibold text-black"
      >
        {Text}
      </label>
    </div>
  );
};

export default RadioButton;
