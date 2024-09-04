import express from 'express';
import { pool } from '../config/db.js';
import { getAllProyectos, getProyectoById, getRespuestasByProyecto, getRespuestasAlcanceByProyecto} from '../controllers/datacontroler.js';

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

router.get('/respuestas/:idproyecto', async (req, res) => {
    try {
      const { idproyecto } = req.params;
      console.log(`ID de proyecto recibido en el backend: ${idproyecto}`); // Verifica el valor del ID
  
      // Llamada al controlador para obtener las respuestas del proyecto
      const respuestas = await getRespuestasByProyecto(idproyecto);
  
      if (respuestas && respuestas.length > 0) {
        res.json({
          proyecto: {
            id: idproyecto,
            nombre: respuestas[0].proyecto_nombre,
          },
          respuestas: respuestas.map((respuesta) => ({
            id: respuesta.idrespuestasobjetivos,
            descripcion: respuesta.descripcion,
            respuesta: respuesta.respuesta,
          })),
        });
      } else {
        res.status(404).json({ error: 'Respuestas no encontradas para el proyecto' });
      }
    } catch (error) {
      console.error('Error al obtener las respuestas del proyecto:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  });

  router.get('/respuestasalcance/:idproyecto', async (req, res) => {
    try {
      const { idproyecto } = req.params;
      console.log(`ID de proyecto recibido en el backend: ${idproyecto}`); // Verifica el valor del ID
      
      // Llamada al controlador para obtener las respuestas de alcance del proyecto
      const respuestasAlcance = await getRespuestasAlcanceByProyecto(idproyecto);
      
      if (respuestasAlcance && respuestasAlcance.length > 0) {
        res.json({
          respuestasAlcance: respuestasAlcance.map((respuesta) => ({
            idalcance: respuesta.idalcance,
            descripcion: respuesta.descripcion,
            respuesta: respuesta.respuesta,
          })),
        });
      } else {
        res.status(404).json({ error: 'Respuestas de alcance no encontradas para el proyecto' });
      }
    } catch (error) {
      console.error('Error al obtener las respuestas de alcance del proyecto:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  });
  
export default router;