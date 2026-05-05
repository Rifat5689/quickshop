import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const adminSchema = new  mongoose.Schema({
    username : {
         type : String , 
         unique : true ,
         trim : true ,
         required : true 
    },
    email : {
         type : String , 
         unique : true , 
         trim : true , 
         required : true 
    },
    password : {
         type : String , 
         required : true  
    }
},{timestamps: true}) ; 

adminSchema.pre("save", async function(next) {
      if(!this.isModified("password")) return next() ; 
      const saltRounds = 12 ; 
       this.password = await bcrypt.hash(this.password,saltRounds) ; 
      next() ; 

})
adminSchema.methods.isPasswordCorrect = async function(password){
      if(!password) return false ; 

      return await bcrypt.compare(password, this.password) ; 
}
adminSchema.methods.generateAccessToken =   function() {
      
     return jwt.sign({
             _id : this._id , 
             email : this.email , 
             username : this.username ,
             
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
          expiresIn : '3h'
     }


)

}
adminSchema.methods.generateRefreshTOken =  function() {
    return jwt.sign(
       {id :this._id},
      process.env.REFRESS_TOKEN_SECRET,
      {expiresIn : '1y'}
    )
      
}

const Admin = mongoose.model("Admin",adminSchema) ; 
export default Admin  ; 