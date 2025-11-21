import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        await connectDatabase();
        
        app.on('error', (err) => {
            console.error('Error al iniciar la aplicación servidor:', err);
            throw err;            
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
        });

    } catch (error) {
        console.log('Falló la conexión a MongoDB',error);
        process.exit(1);
    }
}

startServer();
