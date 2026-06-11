import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

export const register = async (req, res) => {
    try {
        
        const {name, email, password} = req.body
        
        const existingUser = await User.findOne({email})
       
        if(existingUser){
            return res.status(400).json({message: "Email already in use"})
        }
        
        const user = await User.create({name, email, password});

        const token = signToken(user._id)

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (err) {
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({message: message[0]})
        }
        res.status(500).json({ message: "Server error" })
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password required"})
        }

        const user = await User.findOne({email}).select("+password")

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = signToken(user._id)
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
}