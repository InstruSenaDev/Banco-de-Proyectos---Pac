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
    const { idproyecto, resultado, estado, comentario } = req.body;

    // Verifica que todos los datos necesarios estén presentes
    if (!idproyecto || !resultado || !estado || !comentario) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verifica si ya existe una calificación para este proyecto
    const existingCalificacion = await pool.query(
      "SELECT idcalificacion FROM calificacion WHERE idproyecto = $1",
      [idproyecto]
    );

    let idcalificacion;
    if (existingCalificacion.rows.length > 0) {
      // Si ya existe, actualiza la calificación existente
      idcalificacion = existingCalificacion.rows[0].idcalificacion;
      await pool.query(
        "UPDATE calificacion SET resultado = $1, estado = $2, comentario = $3 WHERE idcalificacion = $4",
        [resultado, estado, comentario, idcalificacion]
      );
    } else {
      // Si no existe, inserta una nueva calificación
      const result = await pool.query(
        "INSERT INTO calificacion (resultado, estado, idproyecto, comentario) VALUES ($1, $2, $3, $4) RETURNING idcalificacion",
        [resultado, estado, idproyecto, comentario]
      );

      idcalificacion = result.rows[0].idcalificacion;
    }

    res.status(201).json({ message: "Calificación guardada exitosamente", idcalificacion: idcalificacion });
  } catch (error) {
    console.error("Error al guardar la calificación:", error);
    res.status(500).json({ message: "Error al guardar la calificación" });
  }
};


// Controlador para actualizar el estado de las respuestas
async function actualizarEstadoRespuestas(respuestas) {
  const client = await pool.connect();

  try {
    // Iniciar una transacción
    await client.query('BEGIN');

    for (const respuesta of respuestas) {
      const { idproyecto, idobjetivos, estado } = respuesta;

      // Verifica si ya existe una respuesta para este proyecto y objetivo
      const selectQuery = `
              SELECT idrespuestasobjetivos 
              FROM respuestasobjetivos 
              WHERE idproyecto = $1 AND idobjetivos = $2
          `;
      const selectResult = await client.query(selectQuery, [idproyecto, idobjetivos]);

      if (selectResult.rows.length > 0) {
        // Si existe, realiza un UPDATE
        const idrespuestasobjetivos = selectResult.rows[0].idrespuestasobjetivos;
        const updateQuery = `
                  UPDATE respuestasobjetivos 
                  SET estado = $1 
                  WHERE idrespuestasobjetivos = $2
              `;
        await client.query(updateQuery, [estado, idrespuestasobjetivos]);
      } else {
        // Manejo de caso si la respuesta no existe (opcional)
        console.log(`No existe respuesta para idproyecto ${idproyecto} y idobjetivos ${idobjetivos}`);
      }
    }

    // Finaliza la transacción
    await client.query('COMMIT');
    console.log('Estado actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar estado:', error);

    // Si ocurre un error, deshaz la transacción
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Obtener todas las fichas activas
const getFichas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ficha WHERE estado = TRUE');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las fichas:', err.message);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
};

// Obtener aprendices por ficha
const getAprendicesByFicha = async (req, res) => {
  const { idficha } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM personas WHERE idficha = $1 AND idrol = $2',
      [idficha, 4] // Ahora idrol = 4 es el rol del aprendiz
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los aprendices:', err.message);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
};

// Controlador para asignar proyectos

const asignarProyecto = async (req, res) => {
  const { idproyecto, idpersona } = req.body;

  console.log('Datos recibidos:', { idproyecto, idpersona }); // Log de los datos recibidos

  try {
    const result = await pool.query( // Usando pool.query correctamente
      'INSERT INTO asignaciones_proyectos (idproyecto, idpersona) VALUES ($1, $2) RETURNING *',
      [idproyecto, idpersona]
    );

    console.log('Resultado de la inserción:', result.rows[0]); // Log del resultado

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al asignar proyecto:', error); // Log del error
    res.status(500).json({ success: false, message: 'Error al asignar proyecto', error: error.message });
  }
};


export {
  getProyectos,
  getProyectoById,
  getRespuestasByProyecto,
  getRespuestasAlcanceByProyecto,
  guardarCalificacion,
  actualizarEstadoRespuestas,
  getFichas,
  getAprendicesByFicha,
  asignarProyecto
};

