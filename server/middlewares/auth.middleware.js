const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

exports.verifyUser = asyncHandler(async (req , res , next)=>{
    const token = req.cookies?.accessToken;
    if(!token){
        throw new ApiError(401 , "token not found! ");
    }
    const decodedToken = jwt.verify(token , process.env.JWT_TOKEN_SECRET);
    if(!decodedToken || !decodedToken.id){
        throw new ApiError(403 , "may be token has expired! ");
    }
    const user = await User.findById(decodedToken.id);
    if(!user){
        throw new ApiError(404 , "user not found! ");
    }
    req.user = user;
    next();
})

exports.roleBasedAccess = (...roles)=>{
    return asyncHandler(async (req , res , next)=>{
        if(req.user && roles.includes(req.user.role)){
            return next();
        }
        return res.status(403).json(
            new ApiResponse("you are forbidden to access! " , {} , 403)
        )
    })
}