import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../../Components/CardProyect";
import BotonSegundo from "../../Components/BotonSegundo";
import Layoutprincipal from "../../Layouts/Layoutprincipal";
import Layoutcontenido from "../../Layouts/Layoutcontenido";
import ModalAsignaciones from "../../Components/Modales/Modal";

const Calificar = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectPeople, setSelectedProjectPeople] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/assigned-projects');
        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para depuración
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = (projectName, people) => {
    console.log('Abriendo modal para:', projectName, people); // Para depuración
    setSelectedProjectName(projectName);
    setSelectedProjectPeople(people);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProjectPeople([]);
    setSelectedProjectName('');
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
            {projects.map((project, index) => (
              <CardProyect
                key={index}
                Text={project.nombre_proyecto}
                onOpenModal={() => handleOpenModal(project.nombre_proyecto, project.personas_asignadas)}
              >
                <Link to={`/Detalle/${project.idproyecto}`}>
                  <BotonSegundo Text="Ver" />
                </Link>
              </CardProyect>
            ))}
          </div>
        ) : (
          <p className="text-center">No hay proyectos para mostrar.</p>
        )}
        <ModalAsignaciones
          isOpen={modalOpen}
          onClose={handleCloseModal}
          projectName={selectedProjectName}
          people={selectedProjectPeople}
        />
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default Calificar;