import express from 'express';
import datarouter from './routes/datarouter.js'; // Asegúrate de la ruta correcta

const app = express();
app.use(express.json());

app.use('/api', datarouter); // Montar el enrutador en la ruta /api

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
