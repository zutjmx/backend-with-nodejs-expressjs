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

const loginUser = async (req, res) => {
    // Lógica para iniciar sesión de usuario
    try {
        // Validar si existe el usuario y la contraseña
        const { email, password } = req.body;

        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.status(200).json(
            { 
                message: "Inicio de sesión exitoso",
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

const logoutUser = async (req, res) => {
    // Lógica para cerrar sesión de usuario
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        let usuariosSinPassword = usuarios.map(user => {
            return {
                id: user._id,
                username: user.username,
                email: user.email
            };
        });
        res.status(200).json(usuariosSinPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

export { 
    createUser, 
    loginUser,
    logoutUser,
    listarUsuarios 
};
