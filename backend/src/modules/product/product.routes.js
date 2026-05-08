import { Router } from "express";
import { createProduct, deleteProductById, getAllProducts, getProduct, updateProductById } from "./product.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router() ; 

router
.route('/').post(upload.array("images", 10),createProduct)
.get(getAllProducts)  ; 


router
.route('/:value').get(getProduct)
.patch(updateProductById)
.delete(deleteProductById) 




export default router ; 
