import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Grid from "../Components/Grid";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import BarraPreguntas from "../Components/BarraPreguntas";
import { Evaluar } from "../Components/Evaluar";

const Objetivos = () => {
  const { idproyecto } = useParams();
  const [respuestas, setRespuestas] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [promedio, setPromedio] = useState(0);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/respuestas/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestas(data.respuestas);

          // Inicializar selecciones basadas en respuestas
          const seleccionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = respuesta.respuesta ? "Sí" : "No"; // Convertir booleano a "Sí" o "No"
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          // Inicializar calificaciones a 0
          const calificacionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = 0; // Valor inicial de calificación
            return acc;
          }, {});
          setCalificaciones(calificacionesIniciales);
        } else {
          console.error("Error al obtener las respuestas:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas:", error);
      }
    };

    fetchRespuestas();
  }, [idproyecto]);

  // Manejar el cambio de selección
  const handleSelectionChange = (id, value) => {
    setSelecciones((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Manejar el cambio de calificación
  const handleCalificacionChange = (id, value) => {
    setCalificaciones((prev) => ({
      ...prev,
      [id]: parseFloat(value), // Convertir a número flotante
    }));
  };

  // Calcular el promedio cada vez que cambian las calificaciones
  useEffect(() => {
    const total = Object.values(calificaciones).reduce((acc, cal) => acc + cal, 0);
    const promedioCalculado = respuestas.length > 0 ? total / respuestas.length : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestas.length]);

  return (
    <Layoutprincipal title="Objetivos del Proyecto">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Respuestas</h1>
            </div>
            <BarraPreguntas Text1={"Objetivos del proyecto"} Text2={"Sí"} Text3={"No"} Text4={"Calificar"} />

            {/* Renderiza cada respuesta con su componente Evaluar en fila */}
            {respuestas.map((respuesta) => (
              <div key={respuesta.id} className="flex flex-row items-center space-x-4 mb-4">
                <Grid
                  Text1={respuesta.descripcion}
                  id1={`respuesta-si-${respuesta.id}`}
                  id2={`respuesta-no-${respuesta.id}`}
                  name={`respuesta-${respuesta.id}`}
                  categoria={respuesta.categoria}
                  seleccionado={selecciones[respuesta.id]} // Pasar el valor seleccionado
                  onChange={(e) => handleSelectionChange(respuesta.id, e.target.value)} // Manejador de cambios
                />
                {/* <Evaluar seleccion={selecciones[respuesta.id]} /> */}
                {/* Input para calificar */}
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={calificaciones[respuesta.id]}
                  onChange={(e) => handleCalificacionChange(respuesta.id, e.target.value)}
                  className="border p-2"
                />
              </div>
            ))}

            {/* Mostrar el promedio */}
            <div className="text-right mt-4">
              <h2 className="text-xl font-bold">Promedio de Calificaciones: {promedio.toFixed(2)}</h2>
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
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
