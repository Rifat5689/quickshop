import express from "express" 
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express() ; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
import pageRouter from "../modules/page/page.routes.js";
//routes declaration 

app.use("/api/v1/admin",adminRouter) ; 
app.use("/api/v1/products",productRouter);
app.use("/api/v1/categories",categoryRouter) ; 
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/pages",pageRouter);

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
