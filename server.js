import express from "express";
import 'dotenv/config'

const app = express() ; 
const port = process.env.PORT || 3000  ; 

app.get('/',(req,res) =>{
      const a ='rifat' ; 
      res.send(a) ; 
})
app.listen(port , ()=> console.log("the app is running on port ",port)) ; 
