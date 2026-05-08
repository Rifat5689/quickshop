import { syncIndexes } from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Product from "../product/product.model.js";
import ApiError from "../../utils/ApiError.js";
import User from "../user/user.model.js";
import Order from "./order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";




const createOrder = asyncHandler(async(req,res)=>
{
    const {productId, quantity:qn,shippingDetails} = req.body ; 
       
       if(!shippingDetails || !productId || !qn ) 
        throw new ApiError(400, "Missing fields ") 

    const product =await  Product.findById(productId) ; 
    if(!product) throw new ApiError(404 , "Product not found") ; 
    const orderItem = {
       
        productId : product._id , 
        name : product.name , 
        price : product.price , 
        image: product.images[0] , 
        quantity : qn , 
        

    }

    const {fullName,phone,shippingPrice} = shippingDetails ; 
    const totalPrice = product.price *qn + shippingPrice ; 

     const username = fullName.trim().toLowercase() ;
      const phoneNumber = parseInt(phone.trim()); 
     const user   = User.findOne({phoneNumber}) ; 
    let  createdUser ; 
     if(!user)
        {
           createdUser =  await User.create(
                {
                     username , 
                    phone :  phoneNumber
                }
             )
        }

        const createdOrder = Order.create(
          {
                userId : createdUser._id ,
             orderItem,
             shippingDetails,
                totalPrice

          }
          

        )
        return    res.status(200).josn(
            new ApiResponse(200,createdOrder, "Order created successfully") 
        ) ; 


    
   
        
        
     
    

})    
const getAllOrders = asyncHandler(async (req,res) =>
{
      const orders = Order.find() ; 
      if(!orders) throw new ApiError(401, "Order not found ") ; 
      res.status.json(
        new ApiResponse(200,orders,"Order sent successfully " )
      ) 
})

const getOrderById = asyncHandler (async(req, res) =>{
    const {id} = req.params ; 
    const order = Order.findById(id) ; 
    if(!order) throw new ApiError(401, "Order not found ") ;  
    res.status(201).json(
        new ApiResponse(201, order, "Order sent successfully ")
    ) 
})
export  {createOrder,getAllOrders,getOrderById} ; 