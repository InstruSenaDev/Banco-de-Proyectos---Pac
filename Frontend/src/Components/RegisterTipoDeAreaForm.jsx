import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectBox from './SelectBox'; // Asegúrate de que la ruta sea correcta

const RegisterTipoDeAreaForm = () => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        // Fetch areas from the server
        axios.get('/api/getAreas')
            .then(response => {
                setAreas(response.data);
            })
            .catch(err => {
                console.error('Error fetching areas:', err);
                setError('Error al obtener áreas');
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/api/registerTipoDeArea', {
                areaId: selectedArea,
                nombreTipo,
                estado
            });
            alert('Tipo de área registrado con éxito');
        } catch (err) {
            console.error('Error al registrar tipo de área:', err);
            setError('Error al registrar tipo de área');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="area">Área:</label>
                <SelectBox areas={areas} onChange={(value) => setSelectedArea(value)} />
            </div>
            <div>
                <label htmlFor="nombreTipo">Nombre del tipo de área:</label>
                <input
                    type="text"
                    id="nombreTipo"
                    value={nombreTipo}
                    onChange={(e) => setNombreTipo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="estado">Estado:</label>
                <select
                    id="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <button type="submit">Registrar Tipo de Área</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default RegisterTipoDeAreaForm;
