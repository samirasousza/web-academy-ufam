// import Joi from "joi";

// export const createProductSchema = Joi.object().keys({
//     name: Joi.string().min(3).max(100).required(),
//     price: Joi.number().precision(2).required(),
//     stockQuantity: Joi.number().min(0).integer().required()
// });

// export const updateProductSchema = Joi.object({
//   name: Joi.string().min(3).max(100),
//   price: Joi.number().precision(2).positive(),
//   stockQuantity: Joi.number().integer().min(0),
// }).min(1); // exige pelo menos 1 campo no body, senão o PUT não faz nada

// export const productIdSchema = Joi.object({
//   id: Joi.string().guid({ version: ["uuidv4"] }).required(),
// });