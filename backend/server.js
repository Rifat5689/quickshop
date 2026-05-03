import express from "express";
import 'dotenv/config'
import connectDb from "./src/database/db.js";

const app = express() ; 
const port = process.env.PORT || 3000  ; 
connectDb() ;
app.get('/',(req,res) =>{
      const a ='rifat' ; 
      res.send(a) ; 
})
app.listen(port , ()=> console.log("the app is running on port ",port)) ; 
