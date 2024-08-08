import mongoose from "mongoose";

const dbCon = async ()=>{
        try {
            await mongoose.connect(process.env.DB_URL)
            console.log("DataBase Connected Successfully")
        } catch (error) {
            console.log("ERROR is : ",error)
        }
}
export default dbCon