import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import BarraPreguntas from '../Components/BarraPreguntas';
import Grid from '../Components/Grid';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import { Evaluar } from '../Components/Evaluar';
import { ModalComent } from '../Components/ModalComent';

const Alcance = () => {
  const { idproyecto } = useParams();
  const navigate = useNavigate();
  const [respuestasAlcance, setRespuestasAlcance] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [promedio, setPromedio] = useState(0);

  useEffect(() => {
    const fetchRespuestasAlcance = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/respuestasalcance/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestasAlcance(data.respuestasAlcance);

          const seleccionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = 0;
            return acc;
          }, {});
          setCalificaciones(calificacionesIniciales);
        } else {
          console.error("Error al obtener las respuestas de alcance:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas de alcance:", error);
      }
    };

    fetchRespuestasAlcance();
  }, [idproyecto]);

  useEffect(() => {
    const total = Object.values(calificaciones).reduce((acc, cal) => acc + cal, 0);
    const promedioCalculado = respuestasAlcance.length > 0 ? (total / (respuestasAlcance.length * 10)) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestasAlcance.length]);

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

  const handleNextClick = () => {
    navigate(`/calificacion/${idproyecto}`, {
      state: {
        promedio: promedio
      }
    });
  };

  return (
    <Layoutprincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col space-y-8">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">
                Por favor marque “SI” o “NO” en cada pregunta
              </h1>
            </div>

            <div className="flex justify-center">
              <BarraPreguntas Text1="Alcance" Text2="Sí" Text3="No" Text4="Calificar" />
            </div>

            <div className="text-2xl font-bold mb-2 pl-12">
              Operación y costos
            </div>

            {respuestasAlcance.map((respuesta) => (
              <div key={respuesta.idalcance} className="flex flex-row items-center space-x-4 mb-4">
                <Grid
                  Text1={respuesta.descripcion}
                  id1={`respuesta-si-${respuesta.idalcance}`}
                  id2={`respuesta-no-${respuesta.idalcance}`}
                  name={`respuesta-${respuesta.idalcance}`}
                  categoria={respuesta.categoria}
                  seleccionado={selecciones[respuesta.idalcance]}
                  onChange={(e) => handleSelectionChange(respuesta.idalcance, e.target.value)}
                />
                <Evaluar onChange={(value) => handleEvaluarChange(respuesta.idalcance, value)} />
              </div>
            ))}

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <Link to={`/respuestas/${idproyecto}`}>
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

export default Alcance;
