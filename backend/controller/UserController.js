import UserModels from '../models/User.js';

// Create User
const CreateUser = async (req, res) => {
    try {
        const { name } = req.body;
        const groupCode = 'supersix'; // Hardcoded group code

        // Check if a user with the same name already exists
        const existingUser = await UserModels.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const NewUser = new UserModels({
            name,
            groupCode
        });

        await NewUser.save();
        res.status(200).json({ success: true, message: 'Successfully User Added', NewUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Not Successfully User Added' });
    }
};

// Get User Details
const GetUser = async (req, res) => {
    try {
        const user = await UserModels.find().select('_id name groupCode');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not Found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

// Check User and Group Code
const CheckUser = async (req, res) => {
    try {
        const { name } = req.body;
        const groupCode = 'supersix'; // Hardcoded group code

        // Find user by name and check if the groupCode matches
        const user = await UserModels.findOne({ name, groupCode });
        if (user) {
            return res.status(200).json({ success: true, message: 'User found' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user or group code' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error checking user' });
    }
};

export { CreateUser, GetUser, CheckUser };
