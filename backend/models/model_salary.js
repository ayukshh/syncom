import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        amount: {
            type: Number,
            required: true
        },
        
        payment:{
            type: String,
            enum:["payed, not payed"]
        }
},{timestamps: true}
);

export default mongoose.model("Salary", salarySchema);