import express from 'express'
import {getSalary, salaryDetails} from '../controllers/controller_salary'
import {VerifyToken} from '../middlewares'

const router= express.Router()

router.get('/router', VerifyToken, getSalary)

router.post('/router', VerifyToken, salaryDetails)

export default router; 