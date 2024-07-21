import express from 'express'

const app = express()
app.listen(4000)
console.log('server on port', 4000)

app.post('/api/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const { data: personas, error } = await supabase
            .from('personas')
            .select('id, rol')
            .eq('correo', correo)
            .eq('contrasena', contrasena)
            .single();

        if (error || !personas) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.json({ rol: personas.rol });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});