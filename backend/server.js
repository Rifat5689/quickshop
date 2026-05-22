import express from "express";
import 'dotenv/config'
import connectDb from "./src/config/db.config..js";
import app from "./src/app/app.js";
import mongoose from "mongoose";
import Product from "./src/modules/product/product.model.js";

const port = process.env.PORT || 4000; 
connectDb() ;

app.listen(port , ()=> console.log("the app is running on port ",port)) ; 
