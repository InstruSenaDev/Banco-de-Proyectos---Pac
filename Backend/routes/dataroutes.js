import express from 'express';
import { pool } from '../config/db.js';
import { getAllProyectos} from '../controllers/datacontroler.js';

const router = express.Router();



// Ruta para obtener todos los proyectos = Steeven
router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await getAllProyectos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener un proyecto por ID
router.get('/proyectos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM proyecto WHERE id_proyecto = $1', [id]);
        client.release();

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Proyecto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});




export default router;