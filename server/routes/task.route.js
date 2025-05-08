const express = require("express");
const Router = express.Router();
const { newTask , getUserCreatedTasks , getTask , getUserAssignedTasks ,  updateTask , deleteTask , 
    assignTask , closeTask , getOverdueTaskofUser , roleBasedcontroller , 
    userAnalytics , tasksOverdueTrend  , filterAndSearch} = require("../controllers/task.controller");
const { newTaskSchema , editTaskSchema , assignTaskSchema , closeTaskSchema } = require("../validation/task.validation");
const validateInput = require("../middlewares/validation.middleware"); 
Router.route("/new").post(validateInput(newTaskSchema) , newTask); 
Router.route("/search").get(filterAndSearch); 
Router.route("/get/allcreated/tasks/:userId").get(getUserCreatedTasks);
Router.route("/get/allassigned/tasks/:userId").get(getUserAssignedTasks);
Router.route("/get/overdue/tasks/:userId").get(getOverdueTaskofUser);
Router.route("/assigntask/:taskId").patch(validateInput(assignTaskSchema) , assignTask);
Router.route("/closetask/:taskId").patch(validateInput(closeTaskSchema) , closeTask);
Router.route("/get/user/analytic/:userId").get(userAnalytics);
Router.route("/get/overdue/analytic/:userId").get(tasksOverdueTrend);
Router.route("/:taskId").get(getTask).patch(validateInput(editTaskSchema) , updateTask).delete(deleteTask);
module.exports = Router;