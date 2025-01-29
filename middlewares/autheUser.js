import jwt from "jsonwebtoken";

const ensureAuth = async (req , res, next)=>{
    const auth = req.headers['pushkar']
    if(auth == null){
        return res.status(401).json({message : "Unauthorized" })
    }
    try{
        const decoded = jwt.verify(auth, process.env.SECRET)
        req.user= decoded;
        next()
    }catch(err){
        return res.status(401).json({message : "Invalid token" })
    }
}

export default ensureAuth;