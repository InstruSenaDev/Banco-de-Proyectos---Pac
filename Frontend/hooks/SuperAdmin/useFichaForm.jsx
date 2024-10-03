import { useState } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    numeroficha: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Control de envío del formulario

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar nombre (solo letras y espacios)
    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    // Validar número de ficha (solo 7 dígitos)
    const numerofichaPattern = /^[0-9]{7}$/;
    if (!numerofichaPattern.test(formValues.numeroficha.trim())) {
      errors.numeroficha = 'Debe contener solo números, exactamente 7 dígitos.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmitting && validateForm()) {
      setIsSubmitting(true); // Control del estado de envío
      try {
        const response = await fetch('http://localhost:4000/api/ficha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error desconocido');
        }

        const data = await response.json();
        onSuccess(data); // Acción al registrar con éxito
      } catch (error) {
        console.error('Error al registrar ficha:', error);
        setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
      } finally {
        setIsSubmitting(false); // Finaliza el estado de envío
      }
    }
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
}
