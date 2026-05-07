import mongoose from "mongoose";


const userSchema = new mongoose.Schema ({
     username : String , 
     phone : 
     {
         type : Number ,
         required: true , 
         unique : true 
     }
})
const User = mongoose.model("User",userSchema) ; 
export default User ; 