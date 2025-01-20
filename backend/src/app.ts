import express from "express";
import cors from "cors";
import { config } from "./config";
import { corsOptions } from "./config/cors";
import purchaseRoutes from "./routes/purchase.routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", purchaseRoutes);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🌽 Bob's Corn API running on port ${PORT}`);
});

export default app;
