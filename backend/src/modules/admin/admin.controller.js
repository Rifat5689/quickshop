import mongoose  from "mongoose";
import Admin from "./admin.model";

const register = async(req, res) => {
     try {

        const {username , email , password} = req.body ; 

        if(!username || !email || !password) 
        {
             res.status(400).json(
             {
                   
                status : 404 ,
                success : false , 
                message : "All fields are required" 
             }
             )
        }

        const admin = Admin.create({
            username , 
            email , 
            password 
        })
        if(!admin) 
        {
            res.status(500).json(
             {
                   
                status : 500 ,
                success : false , 
                message : "something went wrong when creating admin" 
             }
        }

        



        
     } catch (error) {
        
     }
}