const Joi = require("joi");
exports.newTaskSchema = Joi.object({
    title:Joi.string().trim().required().min(3).max(200),
    description:Joi.string().trim().required().min(3).max(200),
    duedate:Joi.date().required(),
    priority:Joi.string().trim().valid("low" , "mid" , "high").default("low"),
    userId:Joi.string().hex().length(24).required(),
})

exports.assignTaskSchema = Joi.object({
    userId:Joi.string().hex().length(24).required(),
})

exports.closeTaskSchema = Joi.object({
    userId:Joi.string().hex().length(24).required(),
})

exports.editTaskSchema = Joi.object({
    title:Joi.string().trim().min(3).max(200).optional(),
    description:Joi.string().trim().min(3).max(200).optional(),
    duedate:Joi.date().optional(),
    priority:Joi.string().trim().valid("low" , "mid" , "high").default("low").optional(),
    userId:Joi.string().hex().length(24).optional(),
}).min(1);