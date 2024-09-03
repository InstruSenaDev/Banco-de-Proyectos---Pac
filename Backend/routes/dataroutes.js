import express from 'express';
import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';
import { getAllProyectos, getProyectoById, getRespuestasByProyecto, updatePassword, checkIfUserExists } from '../controllers/datacontroler.js';

const router = express.Router();


// Ruta para actualizar la contraseña
router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await updatePassword(email, newPassword);
      res.status(200).json({ message: 'Contraseña actualizada con éxito', user });
  } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      res.status(500).json({ error: 'Error al actualizar la contraseña', details: error.message });
  }
});

// Ruta para solicitar el enlace de recuperación de contraseña
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
      // Verificar si el usuario existe
      const userExists = await checkIfUserExists(email);

      if (!userExists) {
          return res.status(404).json({ error: 'Por favor regístrate para hacer el cambio de contraseña.' });
      }

      const resetToken = uuidv4(); // Genera un token único
      const resetLink = `http://localhost:4321/UpdatePassword?token=${resetToken}&email=${encodeURIComponent(email)}`;

      const mailOptions = {
          from: 'pac.bancodeproyectos@gmail.com',
          to: email,
          subject: 'Recuperación de Contraseña',
          html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Enlace de restablecimiento enviado' });
  } catch (error) {
      console.error('Error al enviar el enlace de restablecimiento:', error);
      res.status(500).json({ error: `Error al enviar el enlace de restablecimiento: ${error.message}` });
  }
});

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


export default router;