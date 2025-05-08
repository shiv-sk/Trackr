const Joi = require("joi");
exports.newTaskSchema = Joi.object({
    title:Joi.string().trim().required().min(3).max(200),
    description:Joi.string().trim().required().min(3).max(200),
    targetusers:Joi.array().items(Joi.string().hex().length(24)).required(),
    preference:Joi.string().trim().valid("Daily" , "Weekly" , "Monthly" , "Yearly").default("Daily"),
    createdBy:Joi.string().hex().length(24).required(),
})