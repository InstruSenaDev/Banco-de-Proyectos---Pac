import React from 'react';
import "../Style/RadioButton2.css"

const RadioButton2 = ({id, name, value}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="form-radio h-5 w-5 focus:ring-red-600"
      />
    </div>
  );
};

export default RadioButton2;
