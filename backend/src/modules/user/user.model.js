import mongoose from "mongoose";


const userSchema = new mongoose.Schema ({
     username : String , 
     phone: {
         type: String,
         required: true,
         unique: true,
         trim: true
     }
})
const User = mongoose.model("User",userSchema) ; 
export default User ; 