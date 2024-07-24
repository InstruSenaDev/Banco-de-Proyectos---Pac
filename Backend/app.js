import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataroutes.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Asegúrate de que '/api' no esté interfiriendo con '/api/registerFicha'
app.use('/api', dataRoutes); // Esto usa el prefijo '/api' para las rutas en 'dataRoutes'

app.post('/api/registerFicha', (req, res) => {
    console.log('Datos recibidos:', req.body);
    res.status(200).json({ message: 'Ficha registrada' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
