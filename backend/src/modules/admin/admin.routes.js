import { Router } from "express";
import { register,logIn, logOut } from "./admin.controller.js";
import verifyJwt from "./admin.middleware.js";



const router = Router() ; 


router.route("/auth/register").post(register) ; 
router.route("/auth/login").post(logIn) ;


router.use(verifyJwt) ;



router.route("/auth/logout").post(logOut)
export default router ; 