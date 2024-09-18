// Input2.jsx
import PropTypes from 'prop-types';

const Input2 = ({ id, value, onChange, placeholder, type, Text, error }) => {
  return (
    <div>
      {Text && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{Text}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full mt-1 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

Input2.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  Text: PropTypes.string,
  error: PropTypes.string,
};

export default Input2;
