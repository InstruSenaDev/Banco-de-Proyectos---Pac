
import PropTypes from 'prop-types';

const RadioButton2 = ({ id, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 focus:ring-red-600"
      />
      <label htmlFor={id} className="ml-2">{value}</label>
    </div>
  );
};

RadioButton2.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioButton2;
