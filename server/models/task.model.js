// title, description, due date, priority, and status.
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true , "task title is required"],
    },
    description:{
        type:String,
        required:[true , "task description is required"],
        trim:true,
    },
    status:{
        type:String,
        enum:["Opened" , "Assigned" , "Closed"],
        default:"Opened"
    },
    priority:{
        type:String,
        enum:["low" , "mid" , "high"],
        default:"low"
    },
    duedate:{
        type:Date,
        required:true,
        default:new Date(),
    },
    completedAt:{
        type:Date,
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
} , {timestamps:true})

const Task = mongoose.model("Task" , taskSchema);
module.exports = Task; 