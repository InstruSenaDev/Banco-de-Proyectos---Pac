import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';



// Función para obtener todos los proyectos = Steeven
async function getAllProyectos() {
    try {
        console.log('Obteniendo todos los proyectos...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM proyecto');
        client.release();
        console.log('Proyectos obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
}

// Función para obtener un proyecto por ID
async function getProyectoById(id) {
    try {
        const numericId = parseInt(id); // Convertir a entero
        if (isNaN(numericId)) {
            throw new Error('ID inválido');
        }
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM proyecto WHERE idproyecto = $1', [numericId]);
        client.release();
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error);
        throw error;
    }
}

const getRespuestasByProyecto = async (idproyecto) => {
    try {
      const result = await pool.query(
        `SELECT ro.idrespuestasobjetivos, ro.idproyecto, ro.idobjetivos, ro.respuesta, o.descripcion, p.nombre AS proyecto_nombre
         FROM respuestasobjetivos ro
         JOIN objetivos o ON ro.idobjetivos = o.idobjetivos
         JOIN proyecto p ON ro.idproyecto = p.idproyecto
         WHERE ro.idproyecto = $1`,
        [idproyecto]
      );
  
      // Devolver las filas obtenidas
      return result.rows;
    } catch (error) {
      console.error('Error al obtener las respuestas de la base de datos:', error);
      throw error; // Lanzar el error para que sea manejado en las rutas
    }
  };

  const getRespuestasAlcanceByProyecto = async (idproyecto) => {
    try {
      const result = await pool.query(
        `SELECT ra.idrespuesta, ra.idproyecto, ra.idalcance, ra.respuesta, a.descripcion
         FROM respuestasalcance ra
         JOIN alcance a ON ra.idalcance = a.idalcance
         WHERE ra.idproyecto = $1`,
        [idproyecto]
      );
  
      // Devolver las filas obtenidas
      return result.rows;
    } catch (error) {
      console.error('Error al obtener las respuestas de alcance de la base de datos:', error);
      throw error; // Lanzar el error para que sea manejado en las rutas
    }
  };

  // Controlador para guardar la calificación
const guardarCalificacion = async (req, res) => {
  try {
    const { idproyecto, resultado, estado, comentario } = req.body;

    // Verifica que todos los datos necesarios estén presentes
    if (!idproyecto || !resultado || !estado || !comentario) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Inserta la calificación en la base de datos
    const result = await pool.query(
      "INSERT INTO calificacion (idproyecto, resultado, estado, comentario) VALUES ($1, $2, $3, $4) RETURNING idcalificacion",
      [idproyecto, resultado, estado, comentario]
    );

    // Respuesta exitosa con el ID de la calificación insertada
    res.status(201).json({ message: "Calificación guardada exitosamente", idcalificacion: result.rows[0].idcalificacion });
  } catch (error) {
    console.error("Error al guardar la calificación:", error);
    res.status(500).json({ message: "Error al guardar la calificación" });
  }
};
  

export { getAllProyectos, getProyectoById, getRespuestasByProyecto, getRespuestasAlcanceByProyecto, guardarCalificacion };