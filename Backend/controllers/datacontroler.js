
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db.js';


async function checkIfUserExists(correo) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM personas WHERE correo = $1',
            [correo]
        );
        client.release();

        return result.rows.length > 0;
    } catch (error) {
        console.error('Error al verificar si el usuario existe:', error);
        throw error;
    }
}

async function updatePassword(correo, nuevaContraseña) {
    try {
        const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

        const client = await pool.connect();
        const result = await client.query(
            'UPDATE personas SET contraseña = $1 WHERE correo = $2 RETURNING *',
            [hashedPassword, correo]
        );
        client.release();

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw error;
    }
}

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


export { getAllPersonas, getAllUsuario, registerPerson, loginPerson, registerFicha, checkIfUserExists, updatePassword };