import express from 'express';
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express(); // Crear una instancia de Express

app.use(express.json());

// Rutas
app.use("/api/v1/users", userRouter); // Usar el enrutador de usuarios 
app.use("/api/v1/posts", postRouter); // Usar el enrutador de publicaciones

// Ejemplo de endpoint:
// http://localhost:4000/api/v1/users/crear

export default app;
