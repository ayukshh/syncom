import Salary from '../models/model_salary'

export const getSalary= async(req, res, next)=>{
    try{
        const salary= await Salary.find({user:req.user._id})
        res.json(salary)
    }
    catch(err){
        next(err)
    }
};

export const salaryDetails= async(req, res, next)=>{
    try{
        const newSalary= new Salary({
            user:req.user._id,
            amount:req.body.amount,
            payment:req.body.payment
        })
    }
    catch(err){
        next(err);
    }
};