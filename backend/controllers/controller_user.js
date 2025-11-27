import User from '../models/model_user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {Object} req.body - Request body containing email and password
 * @returns {Object} 201 - User created successfully with JWT token
 * @returns {Object} 400 - User already exists
 * @returns {Object} 500 - Server error
 */

export const registerUser = async (req, res) =>{
    try{
        const {email, password}= req.body;

        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message:"user already exist"})
        }
        //create  new user
        const user = new User({email, password});
        await user.save()

        //create token
        const token= jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(201).json({token, UserId: user._id})


    }
    catch(err){
     res.status(500).json({message:"registration failed"})
    }
};


/**
 * Login user
 * @route POST /api/auth/login
 * @param {Object} req.body - Request body containing email and password
 * @returns {Object} 200 - Login successful with JWT token
 * @returns {Object} 401 - Invalid credentials
 * @returns {Object} 500 - Server error
 */


export const loginUser = async (req, res) =>{
    try{
        const{email, password}= req.body;
    
     //find user if existing
     const user= await User.findOne({email});
     if(!user){
        return res.status(401).json({message:"invalid username or password"})
     }
     const isMatch= await bcrypt.compare(password, user.password)
     if (!isMatch){
        return res.status(401).json({message:"invalid password or email"})
     }
     //create token
      const token=jwt.sign(
          {userId: user._id},
          process.env.JWT_SECRET,
          {expiresIn:'1h'}
      )
     res.json({token, userId:user._id})



    }

    catch(err){
        res.json({message:"Login failed"})

    }
};  

