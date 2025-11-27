import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;
        
        if (!name || !description || !age) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }


        const newPost = await Post.create({ name, description, age });
        
        // const newPost = new Post({ name, description, age });
        // await newPost.save();
        
        res.status(201).json({ message: "Post creado exitosamente", post: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Los datos para actualizar no pueden estar vacíos" });
        }
        
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID de post inválido" });
        }

        const { name, description, age } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, { name, description, age }, { new: true });
        
        if (!updatedPost) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.status(200).json({ message: "Post actualizado exitosamente", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID de post inválido" });
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.status(200).json({ message: "Post eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
