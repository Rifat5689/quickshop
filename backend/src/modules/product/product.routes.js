import { Router } from "express";
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "./product.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router() ; 

router
.route('/').post(upload.array("images", 10),createProduct)
.get(getAllProducts)  ; 


router
.route('/:id').get(getProductById)
.patch(updateProductById)
.delete(deleteProductById) 


export default router ; 
