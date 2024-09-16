// hooks/useActualizarEstadoRespuestasAlcance.js

import { useState } from 'react';

const useActualizarEstadoRespuestasAlcance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actualizarEstadoRespuestasAlcance = async (detalles) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/save/actualizarEstadoRespuestasAlcance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalles),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el estado de las respuestas');
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { actualizarEstadoRespuestasAlcance, loading, error };
};

export default useActualizarEstadoRespuestasAlcance;
