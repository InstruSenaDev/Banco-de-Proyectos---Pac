import { useState, useEffect } from 'react';

const useSearchProjects = (filters) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Verifica si hay un nombre para buscar, si no, no realiza la búsqueda
      if (!filters.nombre || filters.nombre.trim() === '') {
        setProjects([]); // Limpiar resultados si no hay nombre
        return;
      }

      setLoading(true);
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:4000/api/search?${queryParams}`);

        if (!response.ok) {
          throw new Error('Error al buscar proyectos');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters]);

  return { projects, loading, error };
};

export default useSearchProjects;
