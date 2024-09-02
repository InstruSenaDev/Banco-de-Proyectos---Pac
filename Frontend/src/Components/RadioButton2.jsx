import React from 'react';

const RadioButton2 = ({ id, name, value }) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                className="form-radio h-5 w-5 focus:ring-red-600"
                style={{
                    accentColor: '#a3e784 ', // CSS property for styling radio button in modern browsers
                }}
            />
        </div>
    );
};

export default RadioButton2;