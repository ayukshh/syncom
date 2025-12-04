import express from "express";
import VerifyToken from "../middlewares/middleware_user.js";
import { 
    GetTasks, 
    GetTaskById, 
    CreateTask, 
    UpdateTask, 
    DeleteTask 
} from "../controllers/controller_tasks.js";

const router = express.Router();

router.get('/tasks', VerifyToken, GetTasks);

router.get('/task/:id', VerifyToken, GetTaskById);

router.post('/task/create', VerifyToken, CreateTask);

router.put('/task/update/:id', VerifyToken, UpdateTask);

router.delete('/task/delete/:id', VerifyToken, DeleteTask);

export default router;
