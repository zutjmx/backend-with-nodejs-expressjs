import express from 'express';
import userRouter from "./routes/user.route.js";

const app = express(); // Crear una instancia de Express

app.use(express.json());

// Rutas
app.use("/api/v1/users", userRouter); // Usar el enrutador de usuarios 

// Ejemplo de endpoint:
// http://localhost:4000/api/v1/users/crear

export default app;
