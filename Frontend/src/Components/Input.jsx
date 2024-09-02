import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({ placeholder, type, Text, id }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="font-josefin-slab font-semibold text-black">
                {Text}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required
                className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
            />
        </div>
    );
};

InputComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["text", "email", "password", "number", "hidden"]).isRequired,
    Text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default InputComponent;