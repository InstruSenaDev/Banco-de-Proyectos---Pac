import express from 'express';
import { pool } from '../config/db.js';
import {  getProyectos, getProyectoById, getRespuestasByProyecto, getRespuestasAlcanceByProyecto, guardarCalificacion, guardarDetalleCalificacion, actualizarEstadoRespuestas} from '../controllers/datacontroler.js';

const router = express.Router();

// Ruta para obtener proyectos, con filtrado opcional por estado de calificación
router.get('/proyectos', getProyectos);

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
                  categoria: respuesta.categoria,  // Incluye la categoría en la respuesta
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
  
      const respuestasAlcance = await getRespuestasAlcanceByProyecto(idproyecto);
      
      if (respuestasAlcance && respuestasAlcance.length > 0) {
        res.json({
          respuestasAlcance: respuestasAlcance.map((respuesta) => ({
            idalcance: respuesta.idalcance,
            descripcion: respuesta.descripcion,
            respuesta: respuesta.respuesta,
            categoria: respuesta.categoria // La categoría ahora es correcta
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
  

  // Ruta para guardar la calificación
router.post('/calificaciones', guardarCalificacion);



// router.post('/detalle_calificacion/:idproyecto', async (req, res) => {
//   const idproyecto = parseInt(req.params.idproyecto, 10);
//   console.log('ID Proyecto recibido:', idproyecto);

//   if (isNaN(idproyecto)) {
//       return res.status(400).json({ error: 'ID del proyecto inválido' });
//   }

//   try {
//       const detalles = req.body;

//       if (!Array.isArray(detalles) || detalles.length === 0) {
//           return res.status(400).json({ error: 'Detalles de calificación inválidos o vacíos' });
//       }

//       await guardarDetalleCalificacion({ params: { idproyecto }, body: detalles }, res);
      
//   } catch (error) {
//       console.error('Error al guardar detalles de calificación:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//   }
// });


  // Ruta para actualizar el estado de una respuesta
// Ruta para actualizar el estado de las respuestas
router.post('/actualizarEstadoRespuestas', async (req, res) => {
  try {
      const respuestas = req.body;

      if (!Array.isArray(respuestas)) {
          return res.status(400).json({ error: 'Formato de datos inválido' });
      }

      await actualizarEstadoRespuestas(respuestas);
      res.status(200).json({ message: 'Estado actualizado correctamente' });
  } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

export default router;