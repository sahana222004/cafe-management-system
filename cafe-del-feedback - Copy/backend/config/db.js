import mongoose from "mongoose";

// Database connection function
export const connectDB = async () => {
    try {
        // Using environment variable for MongoDB URI (it's a good practice for security reasons)
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://vishnuabhi:939121@cluster0.vkq8lyq.mongodb.net/food-del';

        // Connect to MongoDB using mongoose (remove useCreateIndex)
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
        process.exit(1); // Exiting the process if the connection fails
    }
};
