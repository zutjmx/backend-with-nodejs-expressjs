import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 5,
        maxLength: 20, 
    },
    
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Escriba una dirección de correo válida.'],
    },

    password: { 
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 10,
    },

},

{ 
    timestamps: true 
}

);

export const User = mongoose.model('User', userSchema);
//export default User;
