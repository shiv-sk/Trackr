const mongoose = require("mongoose");
const automateTaskSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true , "Automatetask title is required"],
    },
    description:{
        type:String,
        required:[true , "Automatetask description is required"],
        trim:true,
    },
    preference:{
        type:String,
        enum:["Daily" , "Weekly" , "Monthly" , "Yearly"],
        default:"Daily"
    },
    targetusers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
} , {timestamps:true})

const AutomateTask = mongoose.model("AutomateTask" , automateTaskSchema);
module.exports = AutomateTask; 