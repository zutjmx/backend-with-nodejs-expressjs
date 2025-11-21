import { Router } from "express";
import {createUser} from "../controllers/user.controller.js";

const router = Router();

// Future user-related routes will be added here
router.route("/crear").post(createUser);

export default router;

