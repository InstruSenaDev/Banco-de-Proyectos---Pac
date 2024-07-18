import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = 3000;

// Configura Supabase
const supabaseUrl = 'https://lerzcumnybjpexgmttty.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

app.post('/Registro1', async (req, res) => {
    const { nombre, documento, correo, telefono, empresa, contrasena } = req.body;

    // Insertar los datos en la tabla de usuarios
    const { data, error } = await supabase
        .from('personas')
        .insert([
            { nombre, documento, correo, telefono, empresa, contrasena }
        ]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Usuario registrado con éxito', data });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
