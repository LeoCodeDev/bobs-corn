import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://tudominio.com"]
      : ["http://localhost:5173"], // Puerto por defecto de Vite
  methods: ["GET", "POST"],
  credentials: true,
};
