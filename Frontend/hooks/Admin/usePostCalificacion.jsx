import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePostCalificacion = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const postCalificacion = async (idproyecto, promedioFinal, estado, comentario, detalles) => {
        setLoading(true);

        const calificacionData = {
            idproyecto,
            resultado: promedioFinal.toFixed(2),
            estado,
            comentario,
            detalles,
        };

        try {
            // Primero, realiza la solicitud para guardar la calificación
            const response = await fetch("http://localhost:4000/api/admin/calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            if (response.ok) {
                const calificacion = await response.json();

                // Ahora actualiza el idcalificacion en la tabla de proyecto
                const actualizarResponse = await actualizarIdCalificacion(idproyecto, calificacion.idcalificacion);
                
                if (actualizarResponse.ok) {
                    setLoading(false);
                    navigate("/calificar");
                } else {
                    console.error("Error al actualizar idcalificacion");
                    setLoading(false);
                }
            } else {
                console.error("Error al guardar la calificación");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false);
        }
    };

    const actualizarIdCalificacion = async (idproyecto, idcalificacion) => {
        try {
            const response = await fetch("http://localhost:4000/api/admin/actualizar-idcalificacion", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idproyecto, idcalificacion }),
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar idcalificacion:", error);
            return { ok: false };
        }
    };

    return { postCalificacion, loading };
};

export default usePostCalificacion;