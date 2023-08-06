import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || ""

export default async function connectToDB() {
    if (mongoose.connections[0].readyState) {
        console.log("Already Connected");
        return;
    }
    else {
        try {
            await mongoose.connect(mongoURI);
        } catch (error: unknown) {
            console.log(error);
            throw new Error("Some Error Occured")
        }
    }
}