import { useState, useEffect } from 'react';

export const useFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/fichas'); // Cambia la URL a la correcta
        if (!response.ok) {
          throw new Error('Error al obtener las fichas');
        }
        const data = await response.json();
        setFichas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  return { fichas, loading, error };
};
