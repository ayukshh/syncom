import express from 'express'
import VerifyToken from '../middlewares/middleware_user'
import {GetAttendance, DoAttendance, GetAttendanceById} from '../controllers/controller_attendance'

const router = express.Router();

router.get('/attendance', VerifyToken, GetAttendance)

router.get('/attendance/:id', VerifyToken, GetAttendanceById)

router.post('/attendance', VerifyToken, DoAttendance)
