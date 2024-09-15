import { useState } from 'react';

const useRegistroC = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = '';

    if (!value.trim()) {
      error = 'Este campo es obligatorio';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    return error === '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validate(name, value);
  };

  const resetValues = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validateAll = () => {
    const valid = Object.keys(values).every((key) => validate(key, values[key]));
    return valid;
  };

  return {
    values,
    errors,
    handleInputChange,
    validateAll,
    resetValues,
  };
};

export default useRegistroC;
