import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import jobRoutes from "./routes/jobRoutes.js"; // ✅ For Explore Jobs
 


// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/jobs", jobRoutes); // ✅ Jobs route for Explore Jobs


// Health Check Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
