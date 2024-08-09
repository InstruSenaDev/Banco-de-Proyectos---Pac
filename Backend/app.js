import express from 'express';
import router from './routes/dataroutes.js'; // Asegúrate de que la ruta sea la correcta

const app = express();
app.use(express.json());

app.use('/api', router); // Asegúrate de usar '/api' como prefijo si así lo has definido

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
