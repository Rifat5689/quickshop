import mongoose  from "mongoose";
import Admin from "./admin.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const register = asyncHandler(async(req, res) => {
     

        const {username , email , password} = req.body ; 

        if(!username || !email || !password) 
        throw  new ApiError(400,"all fields are required") 


        const isExistAdmin =await Admin.findOne({$or :[{email},{username}]}) ; 
        if(isExistAdmin) 
        throw new ApiError (400, "User Already Exists") 


        const admin =await Admin.create({
            username , 
            email , 
            password 
        })
        if(!admin) 
       throw  new ApiError(500,"Error occured while creating admin")  ;
         const createdAdmin = await Admin.findById(admin._id).select("-refreshToken -password") ; 
        if(!createdAdmin) 
        throw   new ApiError (500 ,"Database Error" ) 
      
        return res.status(201).json(
         new ApiResponse(201,createdAdmin,"Admin created successfully") 
        )

       

        
     } 

) ; 

const login = asyncHandler((req,res) => {
     
   

})

export {register} ; 