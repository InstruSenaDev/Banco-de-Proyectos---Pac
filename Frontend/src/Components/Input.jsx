import React from 'react';
import PropTypes from 'prop-types';

const Input2 = ({ placeholder, type, Text, id, value, onChange, error }) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {Text}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong transition-transform transform outline-none focus:translate-y-[-5px]"
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

Input2.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  Text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input2;
