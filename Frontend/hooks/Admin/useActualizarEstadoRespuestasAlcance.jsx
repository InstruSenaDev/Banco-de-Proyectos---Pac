import { useState } from 'react';

const useActualizarEstadoRespuestasAlcance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const actualizarEstadoRespuestasAlcance = async (detallesAlcance) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:4000/api/save/actualizar-estado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ detallesAlcance }),
            });

            if (!response.ok) {
                throw new Error('Error actualizando el estado');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { actualizarEstadoRespuestasAlcance, loading, error };
};

export default useActualizarEstadoRespuestasAlcance;
