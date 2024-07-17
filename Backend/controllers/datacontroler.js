// Backend/controllers/datacontroller.js
import { pool } from '../config/db.js';

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
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}


export { 
    getAllPersonas, 
    getAllUsuario, 
    registerPerson };
