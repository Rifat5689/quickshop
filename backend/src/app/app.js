import express from "express" 
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express() ; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(helmet()) ;
export default app ; 
