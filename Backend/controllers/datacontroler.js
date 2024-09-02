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

export {
    checkIfUserExists,
    updatePassword
};