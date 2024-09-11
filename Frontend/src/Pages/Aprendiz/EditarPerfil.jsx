// Calificar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../../Components/CardProyect";
import BotonSegundo from "../../Components/BotonSegundo";
import Layoutprincipal from "../../Layouts/Layoutprincipal";
import Layoutcontenido from "../../Layouts/Layoutcontenido";
import Modal from "../../Components/Modal"; // Asegúrate de que la ruta sea correcta

const Calificar = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/assigned-projects');
        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layoutprincipal title="Proyectos">
      <Layoutcontenido title="contenido">
        {loading ? (
          <p className="text-center">Cargando proyectos...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 font-josefin-slab">
            {projects.map((project) => (
              <CardProyect
                key={project.idproyecto}
                Text={project.nombre_proyecto}
                personName={project.personas_asignadas.map(person => person.nombre_persona).join(', ')}
                onOpenModal={() => handleOpenModal(project)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay proyectos para mostrar.</p>
        )}

        {modalOpen && selectedProject && (
          <Modal onClose={handleCloseModal}>
            <h2 className="text-xl font-bold mb-4">Personas asignadas al proyecto {selectedProject.nombre_proyecto}</h2>
            <ul>
              {selectedProject.personas_asignadas.map((person, index) => (
                <li key={index} className="text-lg">{person.nombre_persona}</li>
              ))}
            </ul>
            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Cerrar</button>
          </Modal>
        )}
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default Calificar;
