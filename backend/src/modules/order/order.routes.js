import { Router } from "express";
import createOrder, { getAllOrders, getOrderById } from "./order.controller.js";



const router = Router() ; 

router.route('/').post(createOrder)
.get(getAllOrders)  ; 

router.route('/:id').get(getOrderById) ; 

export default router ; 
