import PropTypes from 'prop-types';

const RadioButton = ({ id, value, name, Text }) => {
  return (
    <div className="flex items-center space-x-4">
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value}
        className="form-radio h-5 w-5 focus:ring-red-600 checked:bg-Verde" 
      />
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {Text}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Text: PropTypes.string.isRequired,
};

export default RadioButton;
