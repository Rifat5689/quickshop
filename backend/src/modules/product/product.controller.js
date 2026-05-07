import { uploadMultipleToCloudinary } from "../../services/cloudinary.service.js";
import { generateUniqueSlug } from "../../services/slug.service.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Product from "./product.model.js";




const createProduct = asyncHandler(async (req,res) =>{
      const {name ,description ,price, category, stock =0,discount =0} = req.body ; 

     if (!name || !price || !description || !category ) {
  throw new ApiError(400, "Mandatory fields are required");
}


      const slug = await generateUniqueSlug(name)  ; 

      const files = req.files ; 
      if(!files || files.length ==0) throw new ApiError(401, "images are required ") ; 

      const result = await uploadMultipleToCloudinary(files) ;
      if(!result) throw new ApiError(500, "failed to upload images") ;   
      const  images = result.map((file)=> ({
        url:file.secure_url,
        public_id:file.public_id

      }));

      const product = await Product.create({
          name ,
          slug ,
          description,
          price , 
          category , 
          stock , 
          discount , 
          images


      })

      if(!product) throw new ApiError(500, "Failed to create product ") ; 

     res.status(200).json(
        new ApiResponse(200, product, "product created successfully")
     )

})
const getAllProducts = asyncHandler(async (req,res) => {
      
    const products =await Product.find() ; 
     if(!products) throw new ApiError(500,"found no products") ; 
     res.status(200).json(
        new ApiResponse(200,products,"all products are sent successfully" )
     )
})

const getProductById = asyncHandler(async (req, res) =>{
      const {id} = req.params ; 
      const product = await Product.findById(id).select("-v") ; 
      if(!product) throw new ApiError(500, "Product is not found  ") ; 
      res.status(200,product, "Product is sent successfully") ; 
      
})
const updateProductById= asyncHandler(async (req,res) =>{
     const {id} = req.params ; 
     const product = await Product.findById(id) ; 
     if(!product) throw new ApiError(500,"Product not found") ; 
    const allowedFields = [
    "name",
    "description",
    "price",
    "stock",
    "discount",
    "category"
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });
    
    const updatedProduct = await product.save() ; 

    if(!updatedProduct) throw new ApiError(500, "failed to update product") ; 
     res.status(200).json(
        new ApiResponse(200, updatedProduct,"product updated successfully")
     )
})

const deleteProductById = asyncHandler(async (req,res) => {
       const {id} = req.params; 
       const product = await  Product.findByIdAndDelete(id) ; 
      if(!product) throw new ApiError(500,"Product not found ")
        res.status(200).json(
       new ApiResponse(200,null, "Product deleted successfully"));
})

export {createProduct,getAllProducts, updateProductById, deleteProductById,getProductById} ; 