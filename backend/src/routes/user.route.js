import { Router } from "express";
import {createUser, loginUser, listarUsuarios} from "../controllers/user.controller.js";

const router = Router();

// Future user-related routes will be added here
router.route("/crear").post(createUser);
router.route("/login").post(loginUser);
router.route("/listar").get(listarUsuarios);

export default router;

