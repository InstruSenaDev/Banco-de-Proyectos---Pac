import express from 'express';
import { pool } from '../config/db.js';
import { getAllProyectos, getProyectoById} from '../controllers/datacontroler.js';

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


export default router;