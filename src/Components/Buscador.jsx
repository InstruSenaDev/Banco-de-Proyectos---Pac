import React from 'react';

const SearchInput = ({ type }) => {
    return (
        <div className="relative w-[450px] max-[768px]:w-[17em] ml-[4pc] my-[10px]">
            <input
                type={type}
                placeholder="Buscar"
                id="searchInput"
                name="search"
                required
                className="bg-[#F5F6FA] font-['sans-serif'] w-full rounded-[20px] border border-[#D5D5D5]  py-[7px] text-[15px] pl-[45px]"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18px] h-[18px] absolute top-1/2 left-[20px] transform -translate-y-1/2"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
            </svg>
        </div>
    );
};

export default SearchInput;