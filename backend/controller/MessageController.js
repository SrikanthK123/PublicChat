import MessageModels from "../models/Messages.js";

// Fetch messages for a specific user
const getMessages = async (req, res) => {
    try {
        const messages = await MessageModels.find({ userId: req.params.userId })
            .populate('userId', 'name')  // Populate the userId field to get the user's name
            .exec();
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get messages' });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { content, sender } = req.body;
        const newMessage = new MessageModels({ userId: req.params.userId, content, sender });
        const savedMessage = await newMessage.save();
        res.status(200).json({ success: true, message: savedMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};



export { getMessages, sendMessage };
