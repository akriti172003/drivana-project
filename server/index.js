import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/cars", carRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
