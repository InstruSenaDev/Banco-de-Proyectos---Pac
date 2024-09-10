import { useState, useEffect } from 'react';

export const useAprendicesByFicha = (idficha) => {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!idficha) return; // Esto previene hacer la petición si no hay un idficha seleccionado
  
    const fetchAprendices = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/aprendices/${idficha}`);
        if (!response.ok) {
          throw new Error('Error al obtener los aprendices');
        }
        const data = await response.json();
        setAprendices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAprendices();
  }, [idficha]);
  

  return { aprendices, loading, error };
};
