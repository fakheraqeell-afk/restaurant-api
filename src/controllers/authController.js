import { AppDataSource } from "../config/data-source.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const userRepo = AppDataSource.getMongoRepository(User);


// Register
export const register = catchAsync(async(req, res) => {
    const { name, email, password, role, phone, address } = req.body;

    
    const existing= await userRepo.findOneBy({ email });
    if (existing) throw new AppError("Email already exists", 400);


    const allowedRoles = ["client", "restaurant_owner"];
    const userRole = role || "client";

    if (!allowedRoles.includes(userRole)) {
        throw new AppError("Invalid role", 400);
    }

     
    const hashedPassword = await bcrypt.hash(password, 10)


    const user = userRepo.create({
        name,
        email,
        password: hashedPassword,
        role: userRole,
        phone,
        address
    });
    await userRepo.save(user),

    res.status(201).json({success: true, message: "User registered successfully."});

})

//Login
export const login = catchAsync(async (req, res) => {
     const { email, password } = req.body;

    
    const user = await userRepo.findOneBy({email});
    if(!user) throw new AppError("Invalid email or password", 401);


    const isPasswordCorrect = await bcrypt.compare( password, user.password);
    if(!isPasswordCorrect) throw new AppError("Invalid email or password", 401);
    
    // Generate JWT
    const token = jwt.sign({userId: user._id.toString(), role: user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE || "7d"})

    res.status(200).json({sucess: true, message: "Login successful", token, user: {_id: user._id, name: user.name, email: user.email, role: user.role}})
})

//Me
export const getMe = catchAsync(async (req, res) => {
    const user = await userRepo.findOneBy({
        _id: new ObjectId(req.user.userId)
    });

    if (!user) throw new AppError("User not found", 404);

    const { password, ...userData } = user;

    res.status(200).json({
        success: true,
        user: userData
    });
});