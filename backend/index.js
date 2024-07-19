import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Rutas
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

// Obtener el puerto desde las variables de entorno o usar 5173 por defecto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
