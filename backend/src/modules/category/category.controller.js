import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Category from "./category.model.js";












const createCategory = asyncHandler(async (req,res) =>{
      const {name} = req.body ; 
     if(!name) throw new ApiError(401, "category name is required " ) ; 
     const normalizedName = name.trim() ; 
     const category = await Category.create({name:normalizedName}) ;

      res.status(200).json(
            new ApiResponse(200,category , "Category created successfully") 
      )

})
export default createCategory ;