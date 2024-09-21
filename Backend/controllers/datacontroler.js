import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';


export async function insertItem(req, res) {
    const { tipoArea, itemName } = req.body;

    if (!tipoArea || !itemName) {
        console.log('Faltan datos requeridos:', { tipoArea, itemName });
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    try {
        const query = `
            INSERT INTO items (idtiposdearea, items)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [tipoArea, itemName];
        const result = await pool.query(query, values);
        console.log('Ítem insertado:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar el ítem:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

export async function getTiposDeArea(req, res) {
    try {
        const query = `
            SELECT 
                idtiposdearea, 
                tiposdearea
            FROM 
                tipodearea;
        `;
        const result = await pool.query(query); // Ejecutamos la consulta
        res.status(200).json(result.rows); // Accedemos a los resultados con result.rows
    } catch (error) {
        console.error('Error al obtener los tipos de área:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de área' });
    }
}
// Obtener los items por id de tipo de área
export async function getItemsByTipoDeArea(req, res) {
    const { idtiposdearea } = req.params; // Obtenemos el id del tipo de área desde la URL
    try {
        const query = `
            SELECT 
                iditemsarea, 
                items, 
                idtiposdearea
            FROM 
                items
            WHERE 
                idtiposdearea = $1;
        `;
        const result = await pool.query(query, [idtiposdearea]); // Ejecutamos la consulta con parámetro
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron items para el tipo de área proporcionado' });
        }
        res.status(200).json(result.rows); // Accedemos a los resultados con result.rows
    } catch (error) {
        console.error('Error al obtener los items por tipo de área:', error);
        res.status(500).json({ message: 'Error al obtener los items por tipo de área' });
    }
}




// Función asincrónica para agregar un nuevo tipo de área
export const addTipoDeArea = async (req, res) => {
    const { nombreTipoArea, idarea } = req.body;

    if (!nombreTipoArea || !idarea) {
        return res.status(400).json({ error: 'Nombre del tipo de área y ID de área son requeridos.' });
    }

    try {
        // Ejecutar la consulta para insertar el nuevo tipo de área
        const result = await pool.query(
            'INSERT INTO tipodearea (tiposdearea, idarea) VALUES ($1, $2) RETURNING *',
            [nombreTipoArea, idarea]
        );

        res.status(201).json(result.rows[0]);  // Devuelve el nuevo tipo de área insertado
    } catch (error) {
        console.error('Error al insertar tipo de área:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


// Función para registrar una nueva ficha
export async function registerFicha(req, res) {
    const { nombre, numeroficha, estado } = req.body;

    try {
        console.log('Datos recibidos en registerFicha:', { nombre, numeroficha, estado });

        const client = await pool.connect();

        // Insertar la ficha en la tabla fichas
        const result = await client.query(
            'INSERT INTO ficha (nombre, numeroficha, estado) VALUES ($1, $2, $3) RETURNING *',
            [nombre, numeroficha, estado]
        );

        client.release();
        console.log('Ficha registrada con éxito:', result.rows[0]);

        // Enviar la respuesta al cliente con la ficha registrada
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al registrar ficha:', error);
        return res.status(500).json({ error: 'Error al registrar ficha' });
    }
}


export const addUser = async (req, res) => {
    const { nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado, idficha } = req.body;

    try {
        // Verificar si el rol es 'Aprendiz' (puedes cambiar '4' por el id correcto según tu tabla)
        if (idrol === 4 && !idficha) {
            return res.status(400).json({ message: 'El campo idficha es requerido para los aprendices.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la tabla 'personas'
        const result = await pool.query(
            `INSERT INTO personas (nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado, idficha) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING idpersonas`,
            [nombre, tipodocumento, numerodocumento, telefono, correo, hashedPassword, idrol, estado, idficha]
        );

        res.status(201).json({ message: 'Usuario creado exitosamente', userId: result.rows[0].idpersonas });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

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
        const result = await client.query('SELECT idpersonas, nombre, correo, estado, idrol FROM personas');
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


// datacontroler.js
const agregarPersona = async (req, res) => {
    const { nombre, tipodocumento, numerodocumento, correo, contrasena, idrol, celular, estado, idficha } = req.body;

    try {
        // Ajuste: asegurarse de que idrol se use correctamente
        const nuevaPersona = {
            nombre,
            tipodocumento,
            numerodocumento,
            correo,
            contrasena,
            idrol,
            celular,
            idficha: idrol === 'Aprendiz' ? idficha : null, // Verifica el valor de idrol
            estado,
        };

        // Simulación de inserción en la base de datos
        const resultado = await db.query('INSERT INTO personas SET ?', nuevaPersona);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Función para obtener todos los proyectos de la base de datos
async function obtenerTodosLosProyectos() {
    try {
        console.log('Obteniendo todos los proyectos...');
        const cliente = await pool.connect();
        const consulta = 'SELECT idproyecto, nombre, responsable FROM proyecto';
        console.log('Ejecutando consulta:', consulta);
        const resultado = await cliente.query(consulta);
        cliente.release();
        console.log('Proyectos obtenidos con éxito:', resultado.rows);
        return resultado.rows;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
}

async function getAllFicha() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT idficha, nombre, estado, numeroficha FROM ficha');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener fichas:', error);
        throw error;
    }
}


// Función para registrar Área
// async function registerArea({ area }) {
//     try {
//         console.log('Datos recibidos en registerArea:', { area });

//         const client = await pool.connect();

//         // Verificar si el área ya existe
//         const checkQuery = 'SELECT COUNT(*) FROM area WHERE area = $1';
//         const checkResult = await client.query(checkQuery, [area]);

//         if (parseInt(checkResult.rows[0].count) > 0) {
//             console.log('El área ya existe.');
//             client.release();
//             return { error: 'El área ya existe.' };
//         } else {
//             // Insertar el área si no existe
//             const insertQuery = 'INSERT INTO area (area) VALUES ($1) RETURNING *';
//             const result = await client.query(insertQuery, [area]);
//             client.release();
//             console.log('Área registrada con éxito:', result.rows[0]);
//             return result.rows[0];
//         }
//     } catch (error) {
//         console.error('Error al registrar área:', error.message, error.stack);
//         throw error;
//     }
// }

// Controlador para registrar un área
async function registerArea({ area }) {
    try {
        // Asegúrate de que 'area' no sea undefined
        if (!area) {
            throw new Error('El campo "area" es obligatorio.');
        }

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO area (area) VALUES ($1) RETURNING *',
            [area.trim()]
        );
        client.release();
        console.log('Área registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar el área:', error);
        throw error;
    }
}




// Función para obtener todos los tipos de área por un área específica
async function getTipoDeArea(idarea) {
    try {
        console.log('Obteniendo tipos de área para el área con ID:', idarea);
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tipodearea WHERE idarea = $1', [idarea]);
        client.release();
        console.log('Tipos de área obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener tipos de área:', error);
        throw error;
    }
}

// Función para registrar un nuevo tipo de área
async function registerTipoDeArea({ tiposdearea, estado, idarea }) {
    const client = await pool.connect();
    console.log("aaaaaaaaaaaaaaa  ", tiposdearea);
    console.log("aaaaaaaaaaaaaaa  ", estado);
    console.log("aaaaaaaaaaaaaaa  ", idarea);

    try {
        const condi = 0;
        const checkQuery = 'SELECT MAX(idtiposdearea) FROM tipodearea WHERE idtiposdearea != $1';
        const checkResult = await client.query(checkQuery, [condi]);

        console.error('>>>>>>>>>>>> ', checkResult);

        if (parseInt(checkResult.rows[0].max) > 0) {
            const cont = checkResult.rows[0].max + 1;
            console.error('>>>>>>>>>>>> ', cont);
            const insertQuery = 'INSERT INTO tipodearea (idtiposdearea,tiposdearea, estado, idarea) VALUES ($1, $2, $3,$4) RETURNING *';
            const result = await client.query(insertQuery, [cont, tiposdearea, estado, idarea]);
            client.release();
            return result.rows[0];
        } else {
            console.error('Error al registrar tipo de área:aaaaa');

        }
    } catch (error) {
        console.error('Error al registrar tipo de área:', error.message);
        // throw error;
    }
}

// Función para registrar un nuevo item en itemsarea
async function registerItemArea({ items, estado, idtiposdearea, idarea }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO itemsarea (items, estado, idtiposdearea, idarea) VALUES ($1, $2, $3, $4) RETURNING *',
            [items, estado, idtiposdearea, idarea]
        );
        client.release();
        console.log('Item registrado con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar item:', error);
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


async function getItemsByAreaAndType(idarea, idtiposdearea) {
    try {
        const client = await pool.connect();
        const query = `
            SELECT items.iditems, items.items, tipo_de_area.tiposdearea, area.area
            FROM items
            INNER JOIN tipo_de_area ON items.idtiposdearea = tipo_de_area.idtiposdearea
            INNER JOIN area ON tipo_de_area.idarea = area.idarea
            WHERE items.idarea = $1 AND items.idtiposdearea = $2
        `;
        const result = await client.query(query, [idarea, idtiposdearea]);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

//  async function registerComplete(req, res) {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');

//     const { area, tiposDeArea, items, categoriaObjetivos, objetivos, categoriaAlcance, alcances } = req.body;

//     // Registrar área
//     const areaResult = await client.query('INSERT INTO area (area) VALUES ($1) RETURNING idarea', [area]);
//     const areaId = areaResult.rows[0].idarea;

//     // Registrar tipos de área
//     for (const tipoArea of tiposDeArea) {
//       await client.query('INSERT INTO tipodearea (tiposdearea, idarea) VALUES ($1, $2)', [tipoArea, areaId]);
//     }

//     // Registrar ítems
//     for (const item of items) {
//       await client.query('INSERT INTO items (items, idarea) VALUES ($1, $2)', [item, areaId]);
//     }

//     // Registrar categoría de objetivos
//     const catObjResult = await client.query('INSERT INTO categoriasobjetivos (nombre) VALUES ($1) RETURNING idcategoriasobjetivos', [categoriaObjetivos]);
//     const catObjId = catObjResult.rows[0].idcategoriasobjetivos;

//     // Registrar objetivos
//     for (const objetivo of objetivos) {
//       await client.query('INSERT INTO objetivos (descripcion, idcategoriasobjetivos) VALUES ($1, $2)', [objetivo, catObjId]);
//     }

//     // Registrar categoría de alcance
//     const catAlcResult = await client.query('INSERT INTO categoriasalcance (nombre) VALUES ($1) RETURNING idcategoriasalcance', [categoriaAlcance]);
//     const catAlcId = catAlcResult.rows[0].idcategoriasalcance;

//     // Registrar alcances
//     for (const alcance of alcances) {
//       await client.query('INSERT INTO alcance (descripcion, idcategoriasalcance) VALUES ($1, $2)', [alcance, catAlcId]);
//     }

//     await client.query('COMMIT');
//     res.status(201).json({ message: 'Registro completo realizado con éxito' });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error en el registro completo:', error);
//     res.status(500).json({ message: 'Error al realizar el registro completo', error: error.message });
//   } finally {
//     client.release();
//   }
// }


const startTransaction = async (req, res) => {
    try {
      await pool.query('BEGIN');
      res.status(200).send({ message: 'Transacción iniciada' });
    } catch (error) {
      res.status(500).send({ error: 'Error al iniciar la transacción' });
    }
  };
  
  const commitTransaction = async (req, res) => {
    try {
      await pool.query('COMMIT');
      res.status(200).send({ message: 'Transacción confirmada' });
    } catch (error) {
      res.status(500).send({ error: 'Error al confirmar la transacción' });
    }
  };
  
  const rollbackTransaction = async (req, res) => {
    try {
      await pool.query('ROLLBACK');
      res.status(200).send({ message: 'Transacción cancelada' });
    } catch (error) {
      res.status(500).send({ error: 'Error al cancelar la transacción' });
    }
  };
  
  const registerArea = async (req, res) => {
    const { area } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO area (nombre) VALUES ($1) RETURNING *',
        [area]
      );
      res.status(200).send({ message: 'Área registrada', area: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar el área' });
    }
  };
  
  const registerTipoArea = async (req, res) => {
    const { descripcion } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO tipo_area (descripcion) VALUES ($1) RETURNING *',
        [descripcion]
      );
      res.status(200).send({ message: 'Tipo de área registrado', tipoArea: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar el tipo de área' });
    }
  };
  
  const registerItem = async (req, res) => {
    const { tipoArea, itemName } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO items (tipo_area, nombre) VALUES ($1, $2) RETURNING *',
        [tipoArea, itemName]
      );
      res.status(200).send({ message: 'Item registrado', item: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar el item' });
    }
  };
  
  const registerCategoriaObjetivos = async (req, res) => {
    const { nombre } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO categoria_objetivos (nombre) VALUES ($1) RETURNING *',
        [nombre]
      );
      res.status(200).send({ message: 'Categoría de objetivos registrada', categoriaObjetivos: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar la categoría de objetivos' });
    }
  };
  
  const registerObjetivo = async (req, res) => {
    const { descripcion } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO objetivos (descripcion) VALUES ($1) RETURNING *',
        [descripcion]
      );
      res.status(200).send({ message: 'Objetivo registrado', objetivo: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar el objetivo' });
    }
  };
  
  const registerCategoriaAlcance = async (req, res) => {
    const { nombre } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO categoria_alcance (nombre) VALUES ($1) RETURNING *',
        [nombre]
      );
      res.status(200).send({ message: 'Categoría de alcance registrada', categoriaAlcance: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar la categoría de alcance' });
    }
  };
  
  const registerAlcance = async (req, res) => {
    const { descripcion } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO alcance (descripcion) VALUES ($1) RETURNING *',
        [descripcion]
      );
      res.status(200).send({ message: 'Alcance registrado', alcance: result.rows[0] });
    } catch (error) {
      res.status(500).send({ error: 'Error al registrar el alcance' });
    }
  };


export {
    getAllPersonas,
    getAllUsuario,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getObjetivosPorArea,
    getObjetivos,
    agregarPersona,
    obtenerTodosLosProyectos,
    getAllFicha,
    registerArea,
    getTipoDeArea,
    registerTipoDeArea,
    registerItemArea,
    checkEmailExists,
    getItemsPorAreaYTipo,
    getItemsByAreaAndType,
    // registerComplete,
    startTransaction,
  commitTransaction,
  rollbackTransaction,
  registerArea,
  registerTipoArea,
  registerItem,
  registerCategoriaObjetivos,
  registerObjetivo,
  registerCategoriaAlcance,
  registerAlcance

};