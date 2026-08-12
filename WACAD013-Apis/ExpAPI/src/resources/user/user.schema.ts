import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(60).required(),
  userTypeId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  userTypeId: Joi.string()
    .guid({ version: ["uuidv4"] }),
}).min(1);

export const userIdSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
});