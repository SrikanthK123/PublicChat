import PublicMessage from "../models/PublicMessages.js";

// Get public messages
export const getPublicMessages = async (req, res) => {
    try {
        const messages = await PublicMessage.find({});
        res.json({ success: true, messages });
    } catch (err) {
        res.json({ success: false, message: 'Failed to fetch public messages' });
    }
};

// Send a public message
export const sendPublicMessage = async (req, res) => {
    const { content, sender } = req.body;
    const newMessage = new PublicMessage({ content, sender });

    try {
        const savedMessage = await newMessage.save();
        res.json({ success: true, message: savedMessage });
    } catch (err) {
        res.json({ success: false, message: 'Failed to send public message' });
    }
};
