import mongoose from "mongoose";

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("ERROR is: ", error);
    }
};

export default dbCon;
