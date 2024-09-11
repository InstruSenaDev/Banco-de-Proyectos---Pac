// hooks/useAreaForm.js
import { useState } from 'react';

const useAreaForm = () => {
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('');
  const [errors, setErrors] = useState({
    nombre: '',
    estado: ''
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Validar Nombre del área (solo letras)
    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(area.trim())) {
      errors.nombre = 'El nombre debe contener solo letras';
      isValid = false;
    } else {
      errors.nombre = '';
    }

    // Validar Estado
    if (!estado) {
      errors.estado = 'Debe seleccionar un estado.';
      isValid = false;
    } else {
      errors.estado = '';
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        area: area.trim(),
      };

      try {
        const response = await fetch('http://localhost:4000/api/registerArea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Error: ${error.error || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Área registrada con éxito:', data);
        window.location.href = '/areas';
      } catch (error) {
        console.error('Error al registrar área:', error);
      }
    }
  };

  return {
    area,
    estado,
    errors,
    handleSubmit
  };
};

export default useAreaForm;
