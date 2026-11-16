import Joi from "joi";

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createRestaurantSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),

    description: Joi.string().min(10).max(500).required(),

    cuisine: Joi.array().items(Joi.string()).min(1).required(),

    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required()
    }).required(),

    contact: Joi.object({
        phone: Joi.string().required(),
        email: Joi.string().email().required()
    }).required(),
    
    openingHours: Joi.object().pattern(
        Joi.string(),Joi.object({
            open: Joi.string().pattern(timePattern).required(),
            close: Joi.string().pattern(timePattern).required()
        })
    ),

});

export const updateRestaurantSchema = Joi.object({
    name: Joi.string().min(2).max(100),

    description: Joi.string().min(10).max(500),

    cuisine: Joi.array().items(Joi.string()).min(1),

    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required()
    }),

    contact: Joi.object({
        phone: Joi.string().required(),
        email: Joi.string().email().required()
    }),
    openingHours: Joi.object().pattern(
        Joi.string(),Joi.object({
            open: Joi.string().pattern(timePattern).required(),
            close: Joi.string().pattern(timePattern).required()
        })
    ),
}).min(1)