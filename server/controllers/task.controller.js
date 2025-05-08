const mongoose = require("mongoose");
const Task = require("../models/task.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const assignTaskNotification = require("../utils/assignEmail");

exports.newTask = asyncHandler(async (req , res)=>{
    const {title , description , duedate , priority , userId} = req.body;
    const existTask = await Task.findOne({$and:[{owner:userId} , {title}]});
    if(existTask){
        return res.status(400).json(
            new ApiResponse("Task is Existed! " , {} , 400 , "fail")
        )
    }
    const task = await Task.create({
        title,
        description,
        owner:userId,
        duedate,
        priority
    });
    if(!task){
        throw new ApiError(500 , "new Task is not created! ");
    }
    return res.status(201).json(
        new ApiResponse("new Task is! " , task , 201)
    )
});

exports.getUserCreatedTasks = (async(req , res)=>{
    console.log("user created task controller hits!");
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is empty or inValid! ");
    }
    const tasks = await Task.find({owner:userId});
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no tasks found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("tasks are! " , tasks , 200)
    )
})

exports.getUserAssignedTasks = (async(req , res)=>{
    console.log("assigned task controller hits!");
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is empty or inValid! ");
    }
    const tasks = await Task.find({assignedTo:userId});
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no tasks found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("tasks are! " , tasks , 200)
    )
})

exports.getOverdueTaskofUser = (async(req , res)=>{
    console.log("OverdueTaskofUser controller hits!");
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is empty or inValid! ");
    }
    const tasks = await Task.find({duedate:{$lt:new Date()} , status:{$ne:"Closed"} , assignedTo:userId});
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no overDue tasks found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("tasks are! " , tasks , 200)
    )
})

exports.getTask = asyncHandler(async(req , res)=>{
    console.log("get task is hitting! ");
    const {taskId} = req.params;
    if(!taskId || !mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400 , "taskId is missing or inValid! ");
    }
    const task = await Task.findById(taskId).populate("assignedTo" , "name");
    if(!task){
        return res.status(404).json(
            new ApiResponse("task not found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("task is! " , task , 200)
    )
})

exports.updateTask = asyncHandler(async(req , res)=>{
    const {taskId} = req.params;
    if(!taskId || !mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400 , "taskId is missing or inValid! ");
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId , req.body , {runValidators:true , new:true});
    if(!updatedTask){
        throw new ApiError(500 , "task is not updated! ");
    }
    return res.status(200).json(
        new ApiResponse("updated task is! " , updatedTask , 200)
    )
})

exports.deleteTask = asyncHandler(async(req , res)=>{
    const {taskId} = req.params;
    if(!taskId || !mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400 , "taskId is missing or inValid! ");
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if(!deletedTask){
        throw new ApiError(500 , "Task is not deleted! ");
    }
    return res.status(204).json()
})

exports.filterAndSearch = asyncHandler(async(req , res)=>{
    const search = req.query.search || "";
    const searchQuery = {
        $or:[
            {title:{$regex:search , $options:"i"}} , 
            {description:{$regex:search , $options:"i"}}
        ]
    }
    const filter = {};
    if(req.query.priority){
        filter.priority = req.query.priority;
    }
    const tasks = await Task.find({...searchQuery , ...filter})
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no tasks found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("tasks are! " , tasks , 200)
    )
}) 

exports.assignTask = asyncHandler(async(req , res)=>{
    const {taskId} = req.params;
    const {userId} = req.body;
    if(!taskId || !mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400 , "taskId is missing or inValid! ");
    }
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is missing or inValid! ");
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId , {assignedTo:userId , status:"Assigned"} , {runValidators:true , new:true})
    .populate([{path:"owner" , select:"name email"} , {path:"assignedTo" , select:"email"}]);
    if(!updatedTask){
        throw new ApiError(500 , "task is not assigned! ");
    }
    const assignedBy = updatedTask.owner.name;
    const assignedByEmail = updatedTask.owner.email;
    const duedate = updatedTask.duedate;
    const taskTitle = updatedTask.title;
    const assignedToEmail = updatedTask.assignedTo.email;
    try {
        assignTaskNotification(duedate , assignedBy , assignedToEmail , taskTitle , assignedByEmail)
    } catch (err) {
        console.error("Failed to send task notification email:", err.message);
    }
    return res.status(200).json(
        new ApiResponse("assigned task is! " , updatedTask , 200)
    )
})

exports.closeTask = asyncHandler(async(req , res)=>{
    const {taskId} = req.params;
    if(!taskId || !mongoose.Types.ObjectId.isValid(taskId)){
        throw new ApiError(400 , "taskId is missing or inValid! ");
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId , 
    {status:"Closed" , completedAt:new Date()} , 
    {runValidators:true , new:true});
    if(!updatedTask){
        throw new ApiError(500 , "task is not updated! ");
    }
    return res.status(200).json(
        new ApiResponse("updated task is! " , updatedTask , 200)
    )
})

exports.userAnalytics = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is missing or inValid! ");
    }
    const tasks = await Task.find({assignedTo:userId});
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no Tasks found! " , {} , 404)
        )
    }
    const completedTasksOnTime = tasks.filter((task)=>task.status === "Closed" && task.completedAt < task.duedate).length;
    const totalTasksAssigned = tasks.length;
    const overDueTasks = tasks.filter((task)=>task.duedate < new Date() && task.status !== "Closed").length;
    const onGoingTasks = tasks.filter((task)=>task.status !== "Closed").length;
    const completedTasks = tasks.filter((task)=>task.status === "Closed").length;
    const taskPercentage = (completedTasks / totalTasksAssigned) * 100;
    return res.status(200).json(
        new ApiResponse("the analytic data is! " , 
            {onTime:completedTasksOnTime , assigned:totalTasksAssigned , overdue:overDueTasks , 
                ongoing:onGoingTasks , completedTasks , taskPercentage} , 200
        )
    )
})

exports.tasksOverdueTrend = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is missing or inValid! ");
    }
    const tasks = await Task.aggregate([
        {
            $match:{
                assignedTo:new mongoose.Types.ObjectId(String(userId)),
                duedate:{$lt:new Date()},
                status:{$ne:"Closed"}
            }
        },
        {
            $group:{
                _id:{
                    $dateToString:{format:"%Y-%m-%d" , date:"$duedate"}
                },
                count:{$sum:1}
            }
        },
        {
            $sort:{
                _id:1
            }
        }
    ])
    if(tasks.length === 0){
        return res.status(404).json(
            new ApiResponse("no Tasks found! " , {} , 404)
        )
    }
    return res.status(200).json(
        new ApiResponse("the analytic data is! " , tasks , 200)
    )
})