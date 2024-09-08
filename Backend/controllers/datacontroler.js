import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

// Controlador para obtener proyectos con filtrado opcional por estado de calificación
const getProyectos = async (req, res) => {
  try {
    const { estado } = req.query;

    let query;
    const values = [];

    if (estado === 'Recibidos') {
      // Filtrar para obtener proyectos que no están aceptados, devueltos o rechazados
      query = `
        SELECT p.*, c.estado 
        FROM proyecto p 
        LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
        WHERE c.estado IS NULL OR c.estado NOT IN ('Aceptado', 'Rechazado', 'Devuelto')`;
    } else {
      // Filtrar por el estado específico
      query = `
        SELECT p.*, c.estado 
        FROM proyecto p 
        INNER JOIN calificacion c ON p.idproyecto = c.idproyecto
        WHERE c.estado = $1`;
      values.push(estado);
    }

    console.log('SQL Query:', query);
    console.log('Values:', values);

    const result = await pool.query(query, values);
    console.log('Resultados de la consulta:', result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).send("Error al obtener los proyectos");
  }
};

// Función para obtener un proyecto por ID
async function getProyectoById(id) {
  try {
    const numericId = parseInt(id); // Convertir a entero
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    const client = await pool.connect();
    const result = await client.query(`
      SELECT p.*, 
             a.area AS nombre_area, 
             c.resultado AS calificacion_resultado, 
             c.estado AS calificacion_estado
      FROM proyecto p
      LEFT JOIN area a ON p.idarea = a.idarea
      LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
      WHERE p.idproyecto = $1
    `, [numericId]);
    
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
      `SELECT ro.idrespuestasobjetivos, ro.idproyecto, ro.idobjetivos, ro.respuesta, 
              o.descripcion, c.nombre AS categoria
         FROM respuestasobjetivos ro
         JOIN objetivos o ON ro.idobjetivos = o.idobjetivos
         JOIN categoriasobjetivos c ON o.idcategoriasobjetivos = c.idcategoriasobjetivos
         WHERE ro.idproyecto = $1`,
      [idproyecto]
    );

    return result.rows;
  } catch (error) {
    console.error('Error al obtener las respuestas de la base de datos:', error);
    throw error; // Lanzar el error para que sea manejado en las rutas
  }
};


const getRespuestasAlcanceByProyecto = async (idproyecto) => {
  try {
    const result = await pool.query(
      `SELECT ra.idrespuesta, ra.idproyecto, ra.idalcance, ra.respuesta, 
              a.descripcion, c.nombre AS categoria
         FROM respuestasalcance ra
         JOIN alcance a ON ra.idalcance = a.idalcance
         JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
         WHERE ra.idproyecto = $1`,
      [idproyecto]
    );

    console.log(result.rows); // Imprime los resultados para verificar que las categorías están incluidas
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las respuestas de alcance de la base de datos:', error);
    throw error;
  }
};



// Controlador para guardar la calificación
const guardarCalificacion = async (req, res) => {
  try {
      const { idproyecto, resultado, estado, comentario, detalles } = req.body;

      // Verifica que todos los datos necesarios estén presentes
      if (!idproyecto || !resultado || !estado || !comentario || !detalles) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      // Inserta la calificación en la base de datos
      const result = await pool.query(
          "INSERT INTO calificacion (idproyecto, resultado, estado, comentario) VALUES ($1, $2, $3, $4) RETURNING idcalificacion",
          [idproyecto, resultado, estado, comentario]
      );

      const idcalificacion = result.rows[0].idcalificacion;

      // Inserta los detalles de la calificación
      const detallePromises = detalles.map((detalle) => {
          return pool.query(
              "INSERT INTO detalle_calificacion (idcalificacion, idrespuesta, tipo_respuesta, estado) VALUES ($1, $2, $3, $4)",
              [idcalificacion, detalle.idrespuesta, detalle.tipo_respuesta, detalle.estado]
          );
      });

      await Promise.all(detallePromises);

      // Actualiza la tabla proyecto con la idcalificacion
      await pool.query(
          "UPDATE proyecto SET idcalificacion = $1 WHERE idproyecto = $2",
          [idcalificacion, idproyecto]
      );

      res.status(201).json({ message: "Calificación guardada exitosamente", idcalificacion: idcalificacion });
  } catch (error) {
      console.error("Error al guardar la calificación:", error);
      res.status(500).json({ message: "Error al guardar la calificación" });
  }
};




export { getProyectoById, getRespuestasByProyecto, getRespuestasAlcanceByProyecto, guardarCalificacion, getProyectos };