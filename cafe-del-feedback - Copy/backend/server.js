// server.js or app.js
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js"; // Import the new order route
import path from "path";
import dotenv from "dotenv"; // Fix dotenv import

// Load environment variables
dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000; // Default to port 4000 if not defined in .env

// Middleware
app.use(express.json());
app.use(cors()); 

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/images", express.static(path.join(process.cwd(), "uploads"))); // For images endpoint

// Connect to the database
connectDB();

// Routes
app.use("/api/food", foodRouter); // Food-related routes
app.use("/api/user", userRouter); // User-related routes
app.use("/api/order", orderRouter); // Order-related routes


// Root route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Error handling middleware (optional but recommended)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Generic error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ success: false, message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
