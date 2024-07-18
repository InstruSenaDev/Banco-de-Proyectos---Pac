/ Backend/controllers/datacontroller.js
import sgMail from '@sendgrid/mail';
import { pool } from '../config/db.js';
import { generateRandomPassword } from './generateRandomPassword.js'; // Asegúrate de tener esta función

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

// Función para recuperar la contraseña
async function recoverPassword(email) {
    try {
        // Generar una nueva contraseña aleatoria
        const newPassword = generateRandomPassword(10); // Aquí especifica la longitud de la contraseña deseada

        // Actualizar la contraseña en la base de datos
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE usuario SET contraseña = $1 WHERE correo = $2 RETURNING *',
            [newPassword, email]
        );
        client.release();

        // Aquí puedes implementar el envío del correo electrónico con la nueva contraseña
        // Ejemplo con SendGrid:
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: 'tu@email.com', // Cambia esto a tu dirección de correo
            subject: 'Recuperación de Contraseña',
            text: `Tu nueva contraseña es: ${newPassword}`,
        };
        await sgMail.send(msg);

        return result.rows[0]; // Devuelve los datos actualizados del usuario si es necesario
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        throw error;
    }
}

export { getAllPersonas, getAllUsuario, registerPerson, recoverPassword };