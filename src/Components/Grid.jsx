import React from 'react';
import RadioButton2 from './RadioButton2';

const Grid = ({ Text1, id1, id2, name }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid gap-4">
        <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-auto">
          <div className="col-span-10 flex items-center">
            <span className="text-lg pl-12">{Text1}</span>
          </div>
          <div className="col-span-1 flex justify-center items-center m-4">
            <RadioButton2 value="" id={id1} name={name} />
          </div>
          <div className="col-span-1 flex justify-center items-center m-4">
            <RadioButton2 value="" id={id2} name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
