import Joi from "joi";

export const createMealSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    restaurant: Joi.string().hex().length(24).required(),
    description: Joi.string().min(5).max(500).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid("appetizer", "main course", "dessert").required(),
    ingredients: Joi.array().items(Joi.string()).min(1).required(),
    preparationTime: Joi.number().min(0).required()
});

export const updateMealSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().min(5).max(500),
    price: Joi.number().min(0),
    category: Joi.string().valid("appetizer", "main course", "dessert"),
    ingredients: Joi.array().items(Joi.string()).min(1),
    preparationTime: Joi.number().min(0)
}).min(1);
