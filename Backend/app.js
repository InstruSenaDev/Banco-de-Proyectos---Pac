const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Configuración de Supabase
const supabaseUrl = 'https://your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint para registrar usuario
app.post('/register', async (req, res) => {
  const { nombre, documento, correo, telefono, empresa, contrasena } = req.body;

  try {
    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('users')
      .insert([{ nombre, documento, correo, telefono, empresa, contrasena: hashedPassword }]);

    if (error) {
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar el usuario por correo
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('correo', correo)
      .single();

    if (error) {
      throw error;
    }

    // Comparar la contraseña
    const match = await bcrypt.compare(contrasena, data.contrasena);

    if (!match) {
      return res.status(401).send('Credenciales inválidas');
    }

    res.status(200).send('Inicio de sesión exitoso');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
