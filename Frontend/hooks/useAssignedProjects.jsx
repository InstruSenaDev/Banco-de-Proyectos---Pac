//Este hook es solo para la vista  Asignados

import { useState, useEffect } from "react";

const useAssignedProjects = (idPersona) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:4000/assigned-projects/${idPersona}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching assigned projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idPersona) {
      fetchProjects();
    }
  }, [idPersona]);

  return { projects, loading };
};

export default useAssignedProjects;
