import Admin from "./admin.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { accessTokenOptions, refreshTokenOptions } from "../../utils/CookieOptions.js";


const generateAccessAndRefreshToken = async (id)=>{
     const admin = await Admin.findById(id) ; 
     if(!admin) throw new ApiError(409 , "Admin not found") ;
     const refreshToken =await  admin.generateRefreshToken() ; 
     const accessToken = await admin.generateAccessToken() ; 
     admin.refreshToken = refreshToken ; 

      await   admin.save({validateBeforeSave:false})
     return {accessToken, refreshToken};
}






const register = asyncHandler(async(req, res) => {
     

        const {username , email , password} = req.body ; 

       if (!username) throw new ApiError(400, "Username is required");
       if (!email) throw new ApiError(400, "Email is required");
       if (!password) throw new ApiError(400, "Password is required");
       


        const isExistAdmin =await Admin.findOne({$or :[{email},{username}]}) ; 
        if(isExistAdmin) 
        throw new ApiError (400, "User Already Exists") 


        const admin =await Admin.create({
            username , 
            email , 
            password 
        })
    const {accessToken, refreshToken} =await generateAccessAndRefreshToken(admin._id) ; 
const createdAdmin = await Admin.findById(admin._id)
  .select("-password -refreshToken");
        return res.status(201).cookie("accessToken",accessToken,accessTokenOptions)
        .cookie("refreshToken" ,refreshToken,refreshTokenOptions)
        .json(
         new ApiResponse(201,createdAdmin,"Admin created successfully") 
        )

       

        
     } 

) ; 

const logIn = asyncHandler(async(req,res) => {
     
   const {identifier, password} = req.body ; 
   
    if(!identifier) 
      throw new ApiError(400,"username or email is required") ; 

   if(!password) throw new ApiError (401, "Missing required field: password") ; 
   const admin  = await Admin.findOne({
       $or : [{email:identifier} , {username :identifier}]
   })
   if (!admin) {
   throw new ApiError(404, "Admin not found");
}
   const checkPassword =await  admin.isPasswordCorrect(password) ;
   if(!checkPassword) throw new ApiError(409, "Invalid credentials") ; 


   const {accessToken, refreshToken} =await generateAccessAndRefreshToken(admin._id) ; 
   
const loggedInAdmin = await Admin.findById(admin._id)
  .select("-password -refreshToken");
   return res.status(200).cookie("accessToken", accessToken, accessTokenOptions)
   .cookie("refreshToken", refreshToken, refreshTokenOptions).
   json(
      new ApiResponse(200,loggedInAdmin, "Admin logged in successfully") 
   )
   


})
const logOut =asyncHandler(async (req,res) =>{

   const admin = await Admin.findByIdAndUpdate(
      req.admin?._id , 
      {
          $unset : {
              refreshToken : 1 
          }
      },
      {
         new: true 
      }
   )  

   return res.status(200).
   clearCookie("accessToken",accessTokenOptions)
   .clearCookie("refreshToken",refreshTokenOptions)
   .json(
      new ApiResponse(200,{}, "Admin logged out") 
   )
         

});

export {register,logIn,logOut} ; 