import Joi from "joi";

export const addCartItemSchema = Joi.object({
  productId: Joi.string().length(40).required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});