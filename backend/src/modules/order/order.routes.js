import { Router } from "express";
import { getAllOrders, getOrderById,createOrder } from "./order.controller.js";



const router = Router() ; 

router.route('/').post(createOrder)
.get(getAllOrders)  ; 

router.route('/:id').get(getOrderById) ; 

export default router ; 
