import { Router } from "express";
import createCategory from "./category.controller.js";



const router = Router() ; 

router.route('/').post(createCategory) ; 

export default router ; 