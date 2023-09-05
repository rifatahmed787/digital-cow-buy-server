import { Joi, validate } from "express-validation";

const validationOrder = {
    body: Joi.object({
        cow: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        buyer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    })
}

export const verifyOrder = validate(validationOrder,{},{})