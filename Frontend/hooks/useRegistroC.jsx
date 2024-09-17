import { useState } from 'react';

const useRegistroC = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Función para contar las palabras en un texto
  const countWords = (text) => text.trim().split(/\s+/).length;

  // Función que realiza todas las validaciones
  const validate = (field, value) => {
    let error = '';

    // Validación: campo obligatorio
    if (!value.trim()) {
      error = 'Este campo es obligatorio';
    } else {
      // Validación: si el campo es un área
      if (field.includes('area')) {
        if (!/\d/.test(value)) {
          error = 'El área debe contener al menos un número';
        } else if (countWords(value) > 30) {
          error = 'El área no debe exceder las 30 palabras';
        }
      }

      // Validación: si el campo es un objetivo
      if (field.includes('objetivo')) {
        if (countWords(value) !== 70) {
          error = 'El objetivo debe tener exactamente 70 palabras';
        }
      }

      // Validación: si el campo es un alcance
      if (field.includes('alcance')) {
        if (countWords(value) !== 300) {
          error = 'El alcance debe tener exactamente 300 palabras';
        }
      }
    }

    // Actualiza los errores
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    // Devuelve true si no hay error, es decir, si el campo es válido
    return error === '';
  };

  // Maneja cambios en los inputs y realiza validaciones
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Valida el campo actual
    validate(name, value);
  };

  // Reinicia los valores y errores del formulario
  const resetValues = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Valida todos los campos del formulario
  const validateAll = () => {
    let isValid = true;
    for (const key in values) {
      if (!validate(key, values[key])) {
        isValid = false;
      }
    }
    return isValid;
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
