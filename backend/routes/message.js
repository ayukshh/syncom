import { Router } from "express";
import { getMessage} from "../controllers/controller_message"
import verifyToken from '../middlewares/middleware_user.js';
import router from "./auth.js";

const router=Router()

router.get("/message",verifyToken, getMessage);
    
export default router;

