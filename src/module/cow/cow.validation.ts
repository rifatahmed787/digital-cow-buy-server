import { Joi, validate } from "express-validation";

const validationCow = {
    body: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        price: Joi.number().required(),
        location: Joi.string().required().valid(
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh"),
        breed: Joi.string().required().valid(
            "Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej"
        ),
        weight: Joi.number().required(),
        category: Joi.string().required().valid("Dairy", "Beef", "DualPurpose"),
        seller: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    })
}

export const verifyCow = validate(validationCow,{},{})


const validationCowUpdate = {
    body: Joi.object({
        name: Joi.string().optional(),
        age: Joi.number().optional(),
        price: Joi.number().optional(),
        location: Joi.string().optional().valid(
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh"),
        breed: Joi.string().optional().valid(
            "Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej"
        ),
        weight: Joi.number().optional(),
        category: Joi.string().optional().valid("Dairy", "Beef", "DualPurpose"),
    })
}

export const verifyCowUpdate = validate(validationCowUpdate,{},{})

export const validationCowQuery = {
    query: Joi.object({
        searchTerm: Joi.string().optional(),
        minPrice: Joi.string().optional(),
        maxPrice: Joi.string().optional(),
        sortBy: Joi.string().optional().valid('price'),
        sortOrder: Joi.string().optional().valid("asc", 'dec'),
        page: Joi.string().optional(),
        limit: Joi.string().optional(),
        location: Joi.string().optional().valid(
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh"
        ),
    })
}

export const verifyCowQuery = validate(validationCowQuery,{},{})