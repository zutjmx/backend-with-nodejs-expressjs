import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.route("/crear").post(createPost);
router.route("/listar").get(getPosts);

export default router;
