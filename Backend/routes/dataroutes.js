import express from 'express';
import { pool } from '../config/db.js';
import { getAllProyectos, getProyectoById, getRespuestasByProyectoId } from '../controllers/datacontroler.js';

const router = express.Router();




router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await getAllProyectos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/proyectos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`ID recibido en el backend: ${id}`); // Verifica el valor del ID
        const proyecto = await getProyectoById(id);

        if (proyecto) {
            res.json(proyecto);
        } else {
            res.status(404).json({ error: 'Proyecto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/proyectos/:id/respuestas', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`ID recibido en el backend: ${id}`); // Verifica el valor del ID
        
        // Obtiene las respuestas del DataController
        const respuestas = await getRespuestasByProyectoId(id);

        if (respuestas.length > 0) {
            res.json(respuestas);
        } else {
            res.status(404).json({ error: 'No se encontraron respuestas para este proyecto' });
        }
    } catch (error) {
        console.error('Error al obtener las respuestas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

export default router;