import express from 'express'
import {GetLeave, leaveDetails} from '../controllers/controller_leave' 
import verifyToken from '../middlewares/middleware_user'

const router=  express.Router()

router.get('/leave',verifyToken, GetLeave)

router.post('/leave', verifyToken, leaveDetails)

export default router;


