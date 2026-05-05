import { Router } from "express";
import { register } from "./admin.controller.js";



const router = Router() ; 


router.route("/register").post(register) ; 

export default router ; 