const express = require("express");
const Router = express.Router();
const { newTask , getUserCreatedTasks , getTask , getUserAssignedTasks ,  updateTask , deleteTask , 
    assignTask , closeTask , getOverdueTaskofUser } = require("../controllers/task.controller");
const { newTaskSchema , editTaskSchema } = require("../validation/task.validation");
const validateInput = require("../middlewares/validation.middleware"); 
Router.route("/new/:userId").post(validateInput(newTaskSchema) , newTask);
Router.route("/get/allcreated/tasks/:userId").get(getUserCreatedTasks);
Router.route("/get/allassigned/tasks/:userId").get(getUserAssignedTasks);
Router.route("/get/overdue/tasks/:userId").get(getOverdueTaskofUser);
Router.route("/assigntask/:taskId").patch(assignTask);
Router.route("/closetask/:taskId").patch(closeTask);
Router.route("/:taskId").get(getTask).patch(validateInput(editTaskSchema) , updateTask).delete(deleteTask);

module.exports = Router;