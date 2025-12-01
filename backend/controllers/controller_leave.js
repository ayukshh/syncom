import Leave from '../models/model_leave'

export const GetLeave= async (req, res,next)=>{
    try{
        const leaves = await Leave.find({user:req.user._id})
        res.json(leaves);
    }
    catch(err){
        next(err);
    }
};

export const leaveDetails= async(req, res, next)=>{
    try{
        const newLeave= new Leave({
            user:req.user._id,
            leaveType:req.body.leaveType,
            reason:req.body.reason
        })

          await newLeave.save();      
        res.json(newLeave);    

    }
    catch(err){
        next(err);
    }
};