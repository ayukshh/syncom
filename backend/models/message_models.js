import mongoose from "mongoose";

const UserMessage= new mongoose.Schema({
    username: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

export default mongoose.model('Message', UserMessage);

