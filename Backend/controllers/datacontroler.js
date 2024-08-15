import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

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

// Función para obtener todas las áreas
async function getAllAreas() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM area');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
}

// Función para obtener todas las fichas
async function getAllFichas() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM ficha');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
}


// Función para registrar una nueva persona
async function registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado }) {
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

// Función para iniciar sesión
async function loginPerson(correo, contraseña) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM personas WHERE correo = $1', [correo]);
        client.release();

        if (result.rows.length > 0) {
            const person = result.rows[0];
            const match = await bcrypt.compare(contraseña, person.contraseña);
            if (match) {
                return { id: person.id, rol: person.idrol };  // Devuelve el rol del usuario
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

// Función para registrar una nueva ficha
async function registerFicha({ nombre, numeroFicha, estado }) {
    try {
        console.log('Datos recibidos en registerFicha:', { nombre, numeroFicha, estado });

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO ficha (nombre, numeroficha, estado) VALUES ($1, $2, $3) RETURNING *',
            [nombre, numeroFicha, estado]
        );
        client.release();
        console.log('Ficha registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar ficha:', error);
        throw error;
    }
}

// Función para registrar Área
async function registerArea({ area, estado }) {
    try {
        console.log('Datos recibidos en registerArea:', { area, estado });

        const client = await pool.connect();

        // Verificar si el área ya existe
        const checkQuery = 'SELECT COUNT(*) FROM area WHERE area = $1';
        const checkResult = await client.query(checkQuery, [area]);

        if (parseInt(checkResult.rows[0].count) > 0) {
            console.log('El área ya existe.');
            client.release();
            return { error: 'El área ya existe.' };
        } else {
            // Insertar el área si no existe
            const insertQuery = 'INSERT INTO area (area, estado) VALUES ($1, $2) RETURNING *';
            const result = await client.query(insertQuery, [area, estado]);
            client.release();
            console.log('Área registrada con éxito:', result.rows[0]);
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al registrar área:', error.message, error.stack);
        throw error;
    }
}

// Función para obtener todos los tipos de área por un área específica
async function getTiposDeArea(idarea) {
    try {
        console.log('Obteniendo tipos de área para el área con ID:', idarea);
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tiposdearea WHERE idarea = $1', [idarea]);
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
    try {
        const client = await pool.connect();
        const checkQuery = 'SELECT COUNT(*) FROM tiposdearea WHERE idarea = $1 AND tiposdearea = $2';
        const checkResult = await client.query(checkQuery, [idarea, tiposdearea]);

        if (parseInt(checkResult.rows[0].count) > 0) {
            client.release();
            return { error: 'El tipo de área ya existe.' };
        } else {
            const insertQuery = 'INSERT INTO tiposdearea (tiposdearea, estado, idarea) VALUES ($1, $2, $3) RETURNING *';
            const result = await client.query(insertQuery, [tiposdearea, estado, idarea]);
            client.release();
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al registrar tipo de área:', error);
        throw error;
    }
}


export { getAllPersonas, getAllUsuario, registerPerson, loginPerson, registerFicha, registerArea, getAllFichas, getAllAreas, getTiposDeArea, registerTipoDeArea };
