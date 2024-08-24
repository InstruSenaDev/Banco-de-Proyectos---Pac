import React from 'react';

const Grid2 = ({ text1, children }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid gap-4">
        <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-14">
          <div className="col-span-10 flex items-center">
            <span className="text-base pl-12">{text1}</span>
          </div>
          <div className="col-span-1 flex justify-center items-center mb-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid2;
