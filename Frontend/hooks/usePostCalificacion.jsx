import { useState } from "react";

export const usePostCalificacion = () => {
    const [loading, setLoading] = useState(false);

    const postCalificacion = async (idproyecto, promedioFinal, estado, comentario, detalles) => {
        setLoading(true);

        const calificacionData = {
            idproyecto,
            resultado: promedioFinal.toFixed(2),
            estado,
            comentario,
            detalles
        };

        try {
            // Crear calificación
            const response = await fetch("http://localhost:4000/api/calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            if (response.ok) {
                const data = await response.json();
                const idcalificacion = data.idcalificacion;

                // Actualizar proyecto con el idcalificacion
                const updateResponse = await fetch("http://localhost:4000/api/actualizar-idcalificacion", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ idproyecto, idcalificacion }),
                });

                setLoading(false);

                if (updateResponse.ok) {
                    console.log("idcalificacion actualizado correctamente en el proyecto");
                    return true;
                } else {
                    console.error("Error al actualizar el idcalificacion en el proyecto");
                    return false;
                }
            } else {
                console.error("Error al guardar la calificación");
                setLoading(false);
                return false;
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false);
            return false;
        }
    };

    return { postCalificacion, loading };
};
