import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Grid from "../Components/Grid"; // Importar el componente Grid
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";

const Objetivos = () => {
  const { idproyecto } = useParams(); // Obtener el ID del proyecto desde la URL
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/respuestas/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestas(data.respuestas);
        } else {
          console.error("Error al obtener las respuestas:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas:", error);
      }
    };

    fetchRespuestas();
  }, [idproyecto]);

  return (
    <Layoutprincipal title="Objetivos del Proyecto">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Respuestas</h1>
            </div>

            {/* Renderiza las respuestas obtenidas usando el componente Grid */}
            {respuestas.map((respuesta) => (
              <Grid
                key={respuesta.id}
                Text1={respuesta.descripcion} // Pasar la pregunta o descripción
                id1={`respuesta-si-${respuesta.id}`} // IDs únicos para los radio buttons de "Sí"
                id2={`respuesta-no-${respuesta.id}`} // IDs únicos para los radio buttons de "No"
                name={`respuesta-${respuesta.id}`} // Nombre único para los radio buttons
                categoria={respuesta.categoria} // Si tienes una categoría u otro dato a pasar
              />
            ))}

            {/* Botones de navegación */}
            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <BotonPrincipal Text="Volver" />
              <a href="/VistaAlcance" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <BotonSegundo Text="Siguiente" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layoutprincipal>
  );
};

export default Objetivos;
