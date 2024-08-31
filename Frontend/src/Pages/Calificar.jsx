import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../Components/CardProyect";
import BotonPrincipal from "../Components/BotonPrincipal";
import RadioButton from "../Components/RadioButton";
import BotonSegundo from "../Components/BotonSegundo";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Layoutcontenido from "../Layouts/Layoutcontenido";

const Calificar = () => {
  const [data, setData] = useState([]);

  // Función para obtener proyectos desde la API
  const fetchProyecto = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/proyectos");
      if (response.ok) {
        const proyectos = await response.json();
        setData(proyectos);
      } else {
        console.error("Error al obtener los proyectos:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red al obtener los proyectos:", error);
    }
  };

  // Llamar a la función para obtener los proyectos al cargar el componente
  useEffect(() => {
    fetchProyecto();
  }, []);

  return (
    <Layoutprincipal title="Proyectos">
      <Layoutcontenido title="contenido">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-7xl">
            <div className="flex justify-start mb-4 ml-9">
              <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-4">
                <RadioButton Text="Aceptado" />
                <RadioButton Text="Rechazado" />
                <RadioButton Text="Devueltos" />
                <RadioButton Text="Todos" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 font-josefin-slab">
              {data.length > 0 ? (
                data.map((proyecto) => (
                  <CardProyect
                    key={proyecto.idproyecto}
                    Text={proyecto.nombre}

                  >
                    <Link to={`/Detalle/${proyecto.idproyecto}`}>
                      <BotonSegundo Text="Ver" />
                    </Link>

                  </CardProyect>
                ))
              ) : (
                <p className="text-center">No hay proyectos para mostrar.</p>
              )}
            </div>
          </div>
        </div>
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default Calificar;
