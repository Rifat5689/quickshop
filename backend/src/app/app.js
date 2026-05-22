import express from "express" 
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express() ; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const defaultOrigins = [
  "https://originsofbeautyadmin.web.app",
  "https://originsofbeauty.web.app",
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
//routes declaration 

app.use("/api/v1/admin",adminRouter) ; 
app.use("/api/v1/products",productRouter);
app.use("/api/v1/categories",categoryRouter) ; 
app.use("/api/v1/orders",orderRouter);

app.use((err, req, res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err)

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
        // SECURITY: Stack trace only in development to prevent info leakage in production
       
    })
})

export { app }
export default app ; 
