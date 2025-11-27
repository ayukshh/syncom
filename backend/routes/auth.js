import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/controller_user.js';
import verifyToken from '../middlewares/middleware_user.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

//protected route 
router.post('/profile', verifyToken, (req, res) => {
    res.json({ message: "protected route accessed" });
});

export default router;
