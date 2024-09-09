import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Grid from "../Components/Grid";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import BarraPreguntas from "../Components/BarraPreguntas";

const Objetivos = () => {
  const { idproyecto } = useParams();
  const [respuestas, setRespuestas] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [promedio, setPromedio] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/respuestas/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestas(data.respuestas);

          const seleccionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = 0; // Inicialización con 0
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

  const handleSelectionChange = (id, value) => {
    setSelecciones((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEvaluarChange = (id, value) => {
    const nuevaCalificacion = value === "1" ? 10 : 0;

    setCalificaciones((prev) => ({
      ...prev,
      [id]: nuevaCalificacion,
    }));
  };

  useEffect(() => {
    const total = Object.values(calificaciones).reduce((acc, cal) => acc + cal, 0);
    const promedioCalculado = respuestas.length > 0 ? (total / (respuestas.length * 10)) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestas.length]);

  const handleNextClick = () => {
    const detalles = respuestas.map((respuesta) => ({
      idrespuesta: respuesta.id,
      tipo_respuesta: "objetivo",
      estado: selecciones[respuesta.id] === "Sí" ? "Aprobado" : "No aceptado",
    }));

    navigate(`/alcance/${idproyecto}`, {
      state: {
        promedioObjetivos: promedio,
        detallesObjetivos: detalles,
      },
    });
  };

  // Agrupar las preguntas por categoría
  const preguntasAgrupadas = respuestas.reduce((acc, respuesta) => {
    if (!respuesta.categoria) {
      console.warn(`Pregunta sin categoría encontrada: ${respuesta.descripcion}`);
    }
    if (!acc[respuesta.categoria]) {
      acc[respuesta.categoria] = [];
    }
    acc[respuesta.categoria].push(respuesta);
    return acc;
  }, {});

  return (
    <Layoutprincipal title="Objetivos del Proyecto">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Respuestas</h1>
            </div>

            <div className="flex justify-center">
              <BarraPreguntas Text1={"Objetivos del proyecto"} Text2={"Sí"} Text3={"No"} Text4={"Calificar"} />
            </div>

            {Object.keys(preguntasAgrupadas).map((categoria, idx) => (
              <div key={idx}>
                <div className="text-lg font-bold grid-cols-12 bg-green-50 md:col-span-10 pl-4 col-span-12 flex py-2">
                  {categoria || 'Sin Categoría'}
                </div>

                {preguntasAgrupadas[categoria].map((respuesta) => (
                  <Grid
                    key={respuesta.id}
                    Text1={respuesta.descripcion}
                    id1={`respuesta-si-${respuesta.id}`}
                    id2={`respuesta-no-${respuesta.id}`}
                    name={`respuesta-${respuesta.id}`}
                    seleccionado={selecciones[respuesta.id]}
                    onChange={(e) => handleSelectionChange(respuesta.id, e.target.value)}
                    handleEvaluarChange={handleEvaluarChange}
                    id={respuesta.id}
                  />
                ))}
              </div>
            ))}

            <div className="text-right mt-4">
              <h2 className="text-xl font-bold">Promedio de Calificaciones: {promedio.toFixed(2)}</h2>
            </div>

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <Link to={`/Detalle/${idproyecto}`}>
                <BotonPrincipal Text="Volver" />
              </Link>
              <BotonSegundo Text="Siguiente" textColor="text-black" onClick={handleNextClick} />
            </div>
          </div>
        </div>
      </div>
    </Layoutprincipal>
  );
};

export default Objetivos;
