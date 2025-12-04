import express from "express";
import { logInAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin/login", logInAdmin);

export default router;
