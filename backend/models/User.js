import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    groupCode: {
        type: String,
        default: 'supersix' // Default value
    }
});

const UserModels = mongoose.model('User', UserSchema);

export default UserModels;
