import { useState, useCallback } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    numeroficha: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      newErrors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    const numerofichaPattern = /^[0-9]{7}$/;
    if (!numerofichaPattern.test(formValues.numeroficha.trim())) {
      newErrors.numeroficha = 'Debe contener solo números, exactamente 7 dígitos';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formValues]);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4000/api/ficha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error desconocido');
        }

        const data = await response.json();
        onSuccess(data);
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  }, [formValues, isSubmitting, validateForm, onSuccess]);

  return {
    formValues,
    errors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
}