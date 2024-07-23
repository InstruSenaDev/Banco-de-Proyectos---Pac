import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataroutes.js';

const app = express();
const PORT = 4000;

// Middleware para manejar solicitudes JSON y de URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const express = require('express');

app.post('/register', (req, res) => {
    const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado } = req.body;

    // Simulación de registro en base de datos
    // Aquí puedes agregar la lógica para insertar los datos en la base de datos
    console.log('Datos recibidos:', req.body);

    if (!nombre || !tipodocumento || !numerodocumento || !telefono || !correo || !contraseña || !idrol) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
    }

    // Responder con un JSON indicando que el registro fue exitoso
    res.status(200).json({ message: 'Usuario registrado con éxito' });
});


// Rutas de la API
app.use('/api', dataRoutes); // Prefijo de ruta para las rutas de datos

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});