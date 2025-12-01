import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User Schema
 * @property {string} email - User's email address (unique)
 * @property {string} password - Hashed password
 * @property {string} position - position in the company default is employee 
 * @property {Date} createdAt - Timestamp of user creation
 */

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
   },
    password:{
        type:String,
        required: true,
        minlength: 6,
    },
    position:{
        type:String,
        default: "employee",
        emum: ["employee","admin"]
    },
    createdat:{
        type: Date,
        default: Date.now
    }
})

//this function runs before saving password and putting to db, it actually hash/salt the password before putting it in the db

userSchema.pre('save', async function(next){
    if (!this.isModified('password'))
        return next()

    try{
        const salt= await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password, salt)
        next()
    }
    catch(err){
        next(err)
    }

});

//candidatepw=plain text pw by user
//this.pw=hashed pw in db
//compare=hash candidatepw and compare with pw in db

/**
 * Method to compare password with hashed password
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} - True if password matches
 */

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch (err){
        throw(err)
    }
};

export default mongoose.model('User', userSchema);
