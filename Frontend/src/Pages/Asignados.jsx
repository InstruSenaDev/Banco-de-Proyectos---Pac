import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import CardProyect from "../Components/CardProyect";
import Layoutcontenido from "../Layouts/Layoutcontenido";
import Layoutprincipal from "../layouts/LayoutPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import ModalAprendiz from "../Components/ModalAprendiz";
import useModal from "../../hooks/Admin/useModal";

const Asignados = () => {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado para el modal
  const [personas, setPersonas] = useState([]); // Personas asignadas al proyecto
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/proyectos/asignados")
      .then((response) => response.json())
      .then((data) => setProyectos(data))
      .catch((error) => console.error("Error fetching proyectos:", error));
  }, []);

  const handleVerClick = (id, nombreProyecto, responsable) => {
    // Obtén las personas asignadas a este proyecto
    fetch(`http://localhost:4000/api/admin/proyectos/${id}/personas`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProject({
          id: id, // Ahora pasamos el ID del proyecto
          nombre: nombreProyecto,
          responsable: responsable,
        });
        setPersonas(data);
        openModal(); // Abre el modal
      })
      .catch((error) => console.error("Error fetching personas:", error));
  };

  return (
    <Layoutprincipal title="Proyectos">
      <Layoutcontenido title="Proyectos Asignados">
        <div className="w-full">
          <div className="flex justify-center flex-wrap w-full">
            {proyectos.map((proyecto) => (
              <CardProyect key={proyecto.idproyecto} Text={proyecto.nombre} >
                <BotonSegundo Text="Ver" onClick={() => handleVerClick(proyecto.idproyecto, proyecto.nombre, proyecto.responsable)} />
              </CardProyect>
            ))}
          </div>
        </div>
      </Layoutcontenido>
      {selectedProject && (
        <ModalAprendiz
          isOpen={isOpen}
          onClose={closeModal}
          projectId={selectedProject.id} // Enviamos el idproyecto
          projectName={selectedProject.nombre}
          responsable={selectedProject.responsable}
          aprendices={personas}
        />
      )}
    </Layoutprincipal>
  );
};

export default Asignados;