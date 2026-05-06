import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import Admin from "./admin.model";

const verifyJwt = asyncHandler(async (req,_, next) =>{
     
          
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","") ; 
if(!token) throw new ApiError(401, "Unauthorized access") ; 
let decodedToken ; 
try {
    decodedToken =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
    
}  catch (jwtError) {
            if (jwtError.name === "TokenExpiredError") {
                throw new ApiError(401, "Access token has expired, please refresh")
            }
            if (jwtError.name === "JsonWebTokenError") {
                throw new ApiError(401, "Invalid access token")
            }
            throw new ApiError(401, "Token verification failed")
        }

        const admin =await  Admin.findById(decodedToken?._id).select("-password -refreshToken") ;
        
        if(!admin) 
            throw new ApiError(401, "Invalid access request - admin not found")
       
        req.admin = admin ; 

   next() ; 
        
      
      
})