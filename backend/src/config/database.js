import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        console.log('Entró a la función connectDatabase')        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n Conectado a la base de datos: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Falló la conexión a la base de datos',error);
        process.exit(1);
    }
}

export default connectDatabase;
