import React from 'react';

const SelectBoxArea = ({Text, id, options}) => {

    return (
        <form className="">
            <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{Text}</label>
            <select
                id={id}
                className="bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong]"
            >
                <option selected disabled>Elige una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </form>
    );
};

export default SelectBoxArea;