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
