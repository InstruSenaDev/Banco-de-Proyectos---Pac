
// hooks/useDetalleCalificacion.js

import { useState } from 'react';

const useDetalleCalificacion = (idproyecto) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const guardarDetalleCalificacion = async (detalles) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/save/actualizarEstadoRespuestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalles),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar los detalles de calificación');
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
  return { guardarDetalleCalificacion, loading, error };
};




export default useDetalleCalificacion;