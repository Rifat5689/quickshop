import mongoose from "mongoose";
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
    },
    refreshToken: {
         type: String,
         default: ''
    }

},{timestamps: true}) ; 

adminSchema.pre("save", async function() {
      if(!this.isModified("password")) return ; 
      const saltRounds = 12 ; 
       this.password = await bcrypt.hash(this.password,saltRounds) ; 
     

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
adminSchema.methods.generateRefreshToken =  function() {
    return jwt.sign(
       {id :this._id},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn : '1y'}
    )
      
}

const Admin = mongoose.model("Admin",adminSchema) ; 
export default Admin  ; 