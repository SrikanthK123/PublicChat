import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    
    
});

const MessageModels = mongoose.model('Message', messageSchema);

export default MessageModels;
