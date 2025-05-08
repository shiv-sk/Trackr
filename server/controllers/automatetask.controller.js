const AutomateTask = require("../models/automate.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.newAutomateTask = asyncHandler(async (req , res)=>{
    const {title , description , targetusers , createdBy , preference} = req.body;
    const existAutomateTask = await AutomateTask.findOne({$and:[{createdBy} , {title}]});
    if(existAutomateTask){
        return res.status(400).json(
            new ApiResponse("AutomateTask is Existed! " , {} , 400 , "fail")
        )
    }
    const automatetask = await AutomateTask.create({
        title,
        description,
        createdBy,
        preference,
        targetusers
    });
    if(!automatetask){
        throw new ApiError(500 , "new automatetask is not created! ");
    }
    return res.status(201).json(
        new ApiResponse("new automatetask is! " , newAutomateTask , 201)
    )
});