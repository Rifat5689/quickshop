import express from "express" 
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express() ; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const defaultOrigins = [
  "https://originsofbeautyadmin.web.app",
  "https://originsofbeatuty.web.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const allowedOrigins = (process.env.CLIENT_URL || defaultOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(helmet()) ;



//routes import 

import adminRouter from "../modules/admin/admin.routes.js";
import productRouter from "../modules/product/product.routes.js";
import categoryRouter from "../modules/category/category.routes.js";
import orderRouter from "../modules/order/order.routes.js";
import settingsRouter from "../modules/settings/settings.routes.js";
//routes declaration 

app.use("/api/v1/admin",adminRouter) ; 
app.use("/api/v1/products",productRouter);
app.use("/api/v1/categories",categoryRouter) ; 
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/settings", settingsRouter);

app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"
    let errors = err.errors || []

    if (err.code === 11000) {
        statusCode = 409
        message = "This URL slug is already in use. Pick another slug."
    } else if (err.name === "ValidationError") {
        statusCode = 400
        message = Object.values(err.errors || {})
            .map((e) => e.message)
            .join(", ") || "Validation failed"
    } else if (err.name === "CastError") {
        statusCode = 400
        message = `Invalid value for ${err.path}`
    } else if (err.name === "MulterError") {
        statusCode = 400
        message =
            err.code === "LIMIT_FILE_SIZE"
                ? "Each image must be under 5MB"
                : err.message
    }

    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err)

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
    })
})

export { app }
export default app ; 
