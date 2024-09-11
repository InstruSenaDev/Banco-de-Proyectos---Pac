import { useState } from 'react';

export function useFichaForm(onFichaAdded) {
  const [nombre, setNombre] = useState('');
  const [numeroFicha, setNumeroFicha] = useState('');
  const [estado, setEstado] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reseteamos el error al inicio del envío

    try {
      const response = await fetch('/api/registerFicha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, numeroFicha, estado }),
      });

      // Verificamos si la respuesta es válida
      if (!response.ok) {
        const errorData = await response.text(); // Obtener respuesta en texto
        const errorMessage = errorData ? JSON.parse(errorData).error : 'Error desconocido';
        throw new Error(errorMessage);
      }

      const newFicha = await response.json();
      onFichaAdded(newFicha);
    } catch (error) {
      console.error('Error al guardar la ficha:', error);
      setError(error.message);
    }
  };

  return {
    nombre,
    setNombre,
    numeroFicha,
    setNumeroFicha,
    estado,
    setEstado,
    error,
    handleSubmit,
  };
}
