// import React from 'react';

// const BotonSegundo = ({ Text }) => {
//   return (
//     <div className="flex justify-end">
//       <button
//         className="w-[175px] h-[44px] bg-[#A3E784] rounded-[5px] text-white relative font-semibold font-sans border border-[#A3E784] 
//         after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#90cc74] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full 
//         after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 
//         transition-all duration-700 mt-3"
//       >
//         <span className="relative  text-black group-hover:text-black text-[18px] duration-500">
//           {Text}
//         </span>
//       </button>
//     </div>
//   );
// };

// export default BotonSegundo;


import React from 'react';

const BotonSegundo = ({ Text, onClick, additionalClasses }) => {
  return (
    <div className="flex justify-end">
      <button
        className={`w-[175px] h-[44px] bg-[#A3E784] rounded-[5px] text-white relative font-semibold font-sans border border-[#A3E784] 
        after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#90cc74] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full 
        after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 
        transition-all duration-700 mt-3 ${additionalClasses || ''}`}
        onClick={onClick}  
      >
        <span className="relative text-black group-hover:text-black text-[18px] duration-500">
          {Text}
        </span>
      </button>
    </div>
  );
};

export default BotonSegundo;