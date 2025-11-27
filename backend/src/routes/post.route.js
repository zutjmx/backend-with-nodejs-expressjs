import { Router } from "express";
import { createPost, getPosts, updatePost,deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/listar").get(getPosts);
router.route("/crear").post(createPost);
router.route("/actualizar/:id").put(updatePost);
router.route("/borrar/:id").delete(deletePost);

export default router;
