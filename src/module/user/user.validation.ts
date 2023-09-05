import { Joi, validate } from "express-validation";

const userValidation = {
    body: Joi.object({
        phoneNumber: Joi.string().required().min(11).max(11),
        role: Joi.string().required().valid("Buyer", "Seller"),
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address: Joi.string().required(),
        budget: Joi.number().optional(),
    })
}

export const verifyUser = validate(userValidation, {}, {})

const userUpadeValidation = {
    body: Joi.object({
        phoneNumber: Joi.string().optional().min(11).max(11),
        password: Joi.string().optional().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        address: Joi.string().optional(),
    })
}

export const verifyUserUpdate = validate(userUpadeValidation, {}, {})

const validationUserQuery = {
    query: Joi.object({
        page: Joi.string().optional(),
        limit: Joi.string().optional(),
    })
}

export const verifyUserQuery = validate(validationUserQuery, {},{})