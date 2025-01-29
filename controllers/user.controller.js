import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req , res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all fields."})
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"user exits with this email id"});
    };

    const newUser = await User.create({name, email, password});
    newUser.password = await bcryptjs.hash(password, 10)
    newUser.save();
    return res.status(200).json({message:"user is saved sussfully"})

};

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please fill all fields."})
    }

    const userExists = await User.findOne({email});
    if(!userExists){
        return res.status(403).json({message: "no user exists with this emial"})
    };
    const isMatch = await bcryptjs.compare(password, userExists.password);
    if(!isMatch){
        return res.status(403).json({message: "password is incorrect"})
    }
    const jwtToken = jwt.sign({
        email: userExists.email,
        _id: userExists._id
    }, 
        process.env.SECRET,
    {
        expiresIn: "1m"
    })

    return res.status(200).json({message: "user is logged in successfully", jwtToken,email, name: userExists.name})
}

const product = async (req , res)=>{
    res.send("hey there is no product untill")
}

export {registerUser, loginUser, product}   