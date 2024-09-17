import { useState, useEffect } from 'react';

const useDetalleCalificacion = (idproyecto) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [puntosObjetivos, setPuntosObjetivos] = useState(null);

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

  const actualizarPuntosObjetivos = async (puntos) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/proyecto/${idproyecto}/actualizarPuntosObjetivos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puntosobjetivos: puntos }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los puntos objetivos');
      }

      const data = await response.json();
      console.log('Puntos objetivos actualizados:', data);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const obtenerPuntosObjetivos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/proyecto/${idproyecto}/puntosObjetivos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los puntos objetivos');
      }

      const data = await response.json();
      console.log('Puntos objetivos obtenidos:', data);
      setPuntosObjetivos(data.puntosobjetivos); // Asume que la respuesta es un objeto con un campo `puntosobjetivos`
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (idproyecto) {
      obtenerPuntosObjetivos();
    }
  }, [idproyecto]);

  return { 
    guardarDetalleCalificacion, 
    actualizarPuntosObjetivos, 
    obtenerPuntosObjetivos, 
    puntosObjetivos, 
    loading, 
    error 
  };
};

export default useDetalleCalificacion;
