import mongoose from "mongoose";

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 60000,  // 60 seconds connection timeout
            socketTimeoutMS: 60000,   // 60 seconds socket timeout
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("ERROR is: ", error);
    }
};

export default dbCon;
