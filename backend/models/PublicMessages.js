import mongoose from 'mongoose';

const publicMessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PublicMessage = mongoose.model('PublicMessage', publicMessageSchema);

export default PublicMessage;
