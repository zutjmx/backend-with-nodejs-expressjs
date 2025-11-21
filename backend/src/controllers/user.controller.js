import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!username || !email || !password) {
            return res.status(400).json(
                { message: "Se requieren los campos de usuario, correo y contraseña" }
            );
        }

        // Verificar si el correo ya está en uso
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "El correo ya está en uso" });
        }

        // Crear un nuevo usuario
        const user = await User.create(
            { 
                username, 
                email: email.toLowerCase(), 
                password,
                //loggedIn: false
            }
        );

        // const newUser = new User({ username, email, password });
        // await newUser.save();
        // res.status(201).json(newUser);

        res.status(201).json(
            { 
                message: "Usuario creado exitosamente", 
                user: { 
                    id: user._id, 
                    username: user.username, 
                    email: user.email 
                }
            }
        );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUser };
