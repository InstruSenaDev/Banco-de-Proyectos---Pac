import { useState, useEffect } from 'react';

export const useCorreoProyecto = (idproyecto) => {
    const [correo, setCorreo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCorreo = async () => {
            try {
                console.log('Fetching correo for proyecto:', idproyecto);
                const response = await fetch(`http://localhost:4000/api/save/correo/${idproyecto}`);
                console.log('Response status:', response.status); // Agrega este log para ver el status de la respuesta
                if (!response.ok) {
                    throw new Error('Error al obtener el correo');
                }
                const data = await response.json();
                console.log('Correo obtenido:', data.correo);
                setCorreo(data.correo);
            } catch (err) {
                console.error('Fetch error:', err); // Asegúrate de ver los errores en la consola
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        if (idproyecto) {
            fetchCorreo();
        }
    }, [idproyecto]);
    

    return { correo, loading, error };
};
