import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
//export default User;
