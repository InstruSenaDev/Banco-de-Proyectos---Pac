import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
import { ListProject } from "../Components/ListProject";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import { ListItem } from "@tremor/react";

const Detalle = () => {
  const { id } = useParams(); // Obtener el parámetro `id` de la URL
  const [proyecto, setProyecto] = useState({
    nombre: "",
    impacto: "",
    responsable: "",
    disponibilidad: "",
    dia: "",
    idalcance: "",
    idobjetivos: "",
    idarea: "",
    idficha: "",
    idpersona: "",
  });

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/proyectos/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProyecto(data);
        } else {
          console.error("Error al obtener el proyecto:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener el proyecto:", error);
      }
    };

    fetchProyecto();
  }, [id]);

  return (
    <Layoutprincipal title="Detalle del proyecto">
      <Layoutcontenido2 title="" text1="Detalle del proyecto">
        <div className="lg:w-full w-full lg:h-auto ">
          <ListProject>
            <ListItem>
              <span className="text-xs sm:text-xl">Nombre del proyecto</span>
              <span className="sm:text-xl">
                {proyecto.nombre || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Sector impactado</span>
              <span className="text-xs sm:text-xl">
                {proyecto.impacto || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Responsable</span>
              <span className="text-xs sm:text-xl">
                {proyecto.responsable || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Disponibilidad</span>
              <span className="text-xs sm:text-xl">
                {proyecto.disponibilidad || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Día</span>
              <span className="text-xs sm:text-xl">
                {proyecto.dia || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Alcance del proyecto</span>
              <span className="text-xs sm:text-xl">
                {proyecto.idalcance || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Objetivos</span>
              <span className="text-xs sm:text-xl">
                {proyecto.idobjetivos || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Área del proyecto</span>
              <span className="text-xs sm:text-xl">
                {proyecto.idarea || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Ficha</span>
              <span className="text-xs sm:text-xl">
                {proyecto.idficha || "No disponible"}
              </span>
            </ListItem>
            <ListItem>
              <span className="text-xs sm:text-xl">Persona</span>
              <span className="text-xs sm:text-xl">
                {proyecto.idpersona || "No disponible"}
              </span>
            </ListItem>
          </ListProject>
          <div className="flex flex-col items-center justify-end lg:justify-end lg:flex-row space-y-2 sm:space-y-0 sm:space-x-4 m-6 ">
            <Link to="/Calificar">
              <BotonPrincipal Text="Atras" />
            </Link>

            <a href="/Objetivos">
              <BotonSegundo Text="Siguiente" />
            </a>
          </div>
        </div>
      </Layoutcontenido2>
    </Layoutprincipal>
  );
};

export default Detalle;
