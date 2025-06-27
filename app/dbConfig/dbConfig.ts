import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo Connected");
        });

        connection.on('error', (error) => {
            console.log("Erron in DB connection", error);
            process.exit();
        });

    } catch (error) {
        console.log('Something goes wrong!');
    }
}