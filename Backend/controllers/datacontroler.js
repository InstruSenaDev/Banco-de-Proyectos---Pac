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

export { getAllProyectos, getProyectoById, getRespuestasByProyecto };