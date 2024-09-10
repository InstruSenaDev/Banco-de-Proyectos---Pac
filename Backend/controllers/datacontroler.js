import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

async function checkEmailExists(correo) {
    if (!correo) {
        throw new Error('El correo electrónico es requerido.');
    }
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT COUNT(*) FROM personas WHERE correo = $1', [correo]);
        client.release();
        
        if (result.rows[0].count > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error en checkEmailExists:', error);
        throw new Error('Error en la base de datos al verificar el correo electrónico.');
    }
}

// Función para obtener todas las personas
async function getAllPersonas() {
    try {
        console.log('Obteniendo todas las personas...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM personas');
        client.release();
        console.log('Personas obtenidas con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener personas:', error);
        throw error;
    }
}

// Función para obtener todos los usuarios
async function getAllUsuario() {
    try {
        console.log('Obteniendo todos los usuarios...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario');
        client.release();
        console.log('Usuarios obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Función para registrar una nueva persona
async function registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol }) {
    try {
        console.log('Contraseña original:', contraseña);
        
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        
        console.log('Contraseña cifrada:', hashedPassword);

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, hashedPassword, idrol] 
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}

// Función para iniciar sesión
async function loginPerson(correo, contraseña) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT idpersonas, idrol, nombre, contraseña FROM personas WHERE correo = $1', [correo]); // Asegúrate de seleccionar 'contraseña'
        client.release();

        if (result.rows.length > 0) {
            const person = result.rows[0];
            if (!person.contraseña) {
                console.error('Error: contraseña no encontrada en la base de datos');
                return null;
            }

            const match = await bcrypt.compare(contraseña, person.contraseña);
            if (match) {
                return { 
                    id: person.idpersonas,  // Cambié 'id' a 'idpersonas'
                    rol: person.idrol, 
                    nombre: person.nombre 
                };
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}


// Función para registrar un nuevo proyecto
async function registerProject({ nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO proyecto (nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea] // Aquí asegúrate de usar idpersona
        );
        client.release();
        console.log('Proyecto registrado con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar proyecto:', error);
        throw error;
    }
}


// Función para actualizar un proyecto existente
async function updateProject({ idproyecto, nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE proyecto SET nombre = $1, impacto = $2, responsable = $3, disponibilidad = $4, dia = $5, idarea = $6, idficha = $7, idpersona = $8, idrespuestaobjetivos = $9, idrespuestaalcance = $10, iditems = $11, idtiposdearea = $12 WHERE idproyecto = $13 RETURNING *',
            [nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea, idproyecto]
        );
        client.release();
        console.log('Proyecto actualizado con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        throw error;
    }
}


// Función para obtener todas las preguntas junto con sus categorías
async function getAllAlcances() {
    try {
        const client = await pool.connect();
        const query = `
            SELECT a.idalcance, a.descripcion, a.aplica, c.nombre as categoria 
            FROM alcance a
            JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
        `;
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener alcances:', error);
        throw error;
    }
}

async function getAllAreas() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT idarea, area FROM area');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
}

async function getTiposDeAreaPorArea(idArea) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT t.idtiposdearea, t.tiposdearea
        FROM tipodearea t
        WHERE t.idarea = $1
      `;
      const result = await client.query(query, [idArea]);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error al obtener tipos de área:', error);
      throw error;
    }
  }

  async function getItemsPorAreaYTipo(idArea, idTiposDeArea) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT * FROM items
        WHERE idarea = $1 AND idtiposdearea = $2
      `;
      const result = await client.query(query, [idArea, idTiposDeArea]);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error al obtener ítems:', error);
      throw error;
    }
  }
  
// Obtener todos los objetivos
async function getObjetivos() {
    try {
        const query = `
            SELECT o.idobjetivos, o.descripcion, o.aplica, o.idarea, co.nombre AS categoria
            FROM objetivos o
            JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        throw error;
    }
};

async function guardarRespuestas(respuestas) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN'); // Inicia una transacción
  
      for (const respuesta of respuestas) {
        const { idproyecto, idalcance, respuesta: valorRespuesta } = respuesta;
  
        // Verifica si ya existe una respuesta para este proyecto y alcance
        const selectQuery = `
          SELECT idrespuesta 
          FROM respuestasalcance 
          WHERE idproyecto = $1 AND idalcance = $2
        `;
        const selectResult = await client.query(selectQuery, [idproyecto, idalcance]);
  
        if (selectResult.rows.length > 0) {
          // Si existe, realiza un UPDATE
          const idrespuesta = selectResult.rows[0].idrespuesta;
          const updateQuery = `
            UPDATE respuestasalcance 
            SET respuesta = $1 
            WHERE idrespuesta = $2
          `;
          await client.query(updateQuery, [valorRespuesta, idrespuesta]);
        } else {
          // Si no existe, realiza un INSERT
          const insertQuery = `
            INSERT INTO respuestasalcance (idproyecto, idalcance, respuesta) 
            VALUES ($1, $2, $3) RETURNING idrespuesta
          `;
          const result = await client.query(insertQuery, [idproyecto, idalcance, valorRespuesta]);
  
          // Extrae el idrespuesta generado
          const idrespuesta = result.rows[0].idrespuesta;
  
          // Ahora, actualiza la tabla `proyecto` con este idrespuesta
          const updateQuery = 'UPDATE proyecto SET idrespuestaalcance = $1 WHERE idproyecto = $2';
          await client.query(updateQuery, [idrespuesta, idproyecto]);
        }
      }
  
      await client.query('COMMIT'); // Confirma la transacción
      console.log('Respuestas y actualización del proyecto guardadas con éxito');
    } catch (error) {
      await client.query('ROLLBACK'); // Revertir en caso de error
      console.error('Error al guardar respuestas:', error);
      throw error;
    } finally {
      client.release();
    }
  }
  
async function updateProjectWithArea(areaId, projectId) { // Agrega async aquí
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE proyecto SET idarea = $1 WHERE idproyecto = $2 RETURNING *',
            [areaId, projectId]
        );
        
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar el proyecto con el área:', error);
        throw error;
    }
}

  
// Obtener objetivos por área
async function getObjetivosPorArea(idArea) {
    try {
        const query = `
            SELECT o.idobjetivos, o.descripcion, o.aplica, co.nombre AS categoria
            FROM objetivos o
            JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
            WHERE o.idarea = $1
        `;
        const result = await pool.query(query, [idArea]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener objetivos por área:', error);
        throw error;
    }
}

async function updateProjectTipo(areaId, projectId) {
    try {
        const result = await pool.query(
            `UPDATE proyecto SET idtiposdearea = $1 WHERE idproyecto = $2`,
            [areaId, projectId]
        );

        if (result.rowCount === 0) {
            throw new Error('Proyecto no encontrado');
        }

        return { message: 'Proyecto actualizado correctamente' };
    } catch (error) {
        console.error('Error updating proyecto:', error);
        throw error;
    }
}

async function updateProyectoItem({ projectId, itemId }) {
    try {
      // Asegúrate de que los valores estén presentes
      if (!projectId || !itemId) {
        throw new Error('Faltan parámetros en la solicitud');
      }
  
      const result = await pool.query(
        `UPDATE proyecto SET iditems = $1 WHERE idproyecto = $2`,
        [itemId, projectId]
      );
  
      if (result.rowCount === 0) {
        throw new Error('Proyecto no encontrado');
      }
  
      return { message: 'Ítem actualizado correctamente' };
    } catch (error) {
      console.error('Error updating proyecto:', error);
      throw error;
    }
  }
  
  async function guardarRespuestasObjetivos(respuestas) {
    const client = await pool.connect();

    try {
        // Iniciar una transacción
        await client.query('BEGIN');

        for (const respuesta of respuestas) {
            const { idproyecto, idobjetivos, respuesta: valorRespuesta } = respuesta;

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
                    SET respuesta = $1 
                    WHERE idrespuestasobjetivos = $2
                `;
                await client.query(updateQuery, [valorRespuesta, idrespuestasobjetivos]);
            } else {
                // Si no existe, realiza un INSERT
                const insertQuery = `
                    INSERT INTO respuestasobjetivos (idproyecto, idobjetivos, respuesta) 
                    VALUES ($1, $2, $3) RETURNING idrespuestasobjetivos
                `;
                const insertResult = await client.query(insertQuery, [idproyecto, idobjetivos, valorRespuesta]);

                // Extrae el idrespuestasobjetivos generado
                const idrespuestasobjetivos = insertResult.rows[0].idrespuestasobjetivos;

                // Actualiza la tabla `proyecto` con este idrespuestasobjetivos si es necesario
                const updateProyectoQuery = `
                    UPDATE proyecto 
                    SET idrespuestaobjetivos = $1 
                    WHERE idproyecto = $2
                `;
                await client.query(updateProyectoQuery, [idrespuestasobjetivos, idproyecto]);
            }
        }

        // Finaliza la transacción
        await client.query('COMMIT');
        console.log('Respuestas y actualización del proyecto guardadas con éxito');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);

        // Si ocurre un error, deshaz la transacción
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function agregarPersona({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado }) {
    try {
        console.log('Datos recibidos en registerPerson:', { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        console.log('Contraseña cifrada:', hashedPassword);

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [nombre, tipodocumento, numerodocumento, nombreempresa || null, telefono, correo, hashedPassword, idrol, estado || null]
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}

const getUserNameById = async (userId) => {
    try {
        const user = await User.findById(userId); // Suponiendo que estás utilizando Mongoose
        return user ? user.name : null;
    } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
        return null;
    }
};


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

// En tu controlador
const getProyectosUsuario = async (req, res) => {
    const { userId } = req.query; // Obtener userId de la query string
  
    try {
      const result = await pool.query(
        `SELECT p.idproyecto, p.nombre, c.estado
         FROM proyecto p
         JOIN calificacion c ON p.idcalificacion = c.idcalificacion
         WHERE p.idpersona = $1`,
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Error al obtener los proyectos del usuario:', err.message);
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
  };
  

export {
    getAllPersonas,
    getAllUsuario,
    registerPerson,
    loginPerson,
    registerProject,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo,
    getObjetivos,
    guardarRespuestas,
    getObjetivosPorArea,
    updateProjectWithArea,
    updateProjectTipo,
    updateProyectoItem,
    guardarRespuestasObjetivos,
    checkEmailExists,
    agregarPersona,
    getUserNameById,
    getFichas,
    getAprendicesByFicha,
    getProyectosUsuario,
    updateProject
};