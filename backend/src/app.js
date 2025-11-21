import express from 'express';
import userRouter from "./routes/user.route.js";

const app = express(); // Crear una instancia de Express

app.use(express.json());

app.use("/api/v1/users", userRouter); // Usar el enrutador de usuarios 

export default app;
