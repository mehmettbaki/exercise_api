const express = require('express');
const { validationResult, body } = require('express-validator');
// can be reused by many routes

const createProductValidation= [
    body("product_name").notEmpty().withMessage('asdasd'),
    body("detail").notEmpty().withMessage('asdasd'),
    body("price").notEmpty().withMessage('asdasd'),
]


const loginValidation = [
    body('username').notEmpty().withMessage('username yok'),
    body('password').notEmpty().withMessage('password yok'),
]
// sequential processing, stops running validations chain if the previous one fails.
const UserCreateValidation = [
    body('username').notEmpty().withMessage('username yok'),
    body('password').notEmpty().withMessage('password yok'),
    body('firstName').notEmpty().withMessage('firstName eksik'),
    body('lastName').notEmpty().withMessage('lastname eksik'),
    body('email').notEmpty().isEmail().withMessage('email eksik'),
    body('gender').notEmpty().withMessage('gender eksik')
]

const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};



module.exports = { validate, UserCreateValidation, loginValidation ,createProductValidation}