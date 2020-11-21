import {check} from 'express-validator';


export const userSignUpValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is Required!'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email addresss'),
    check('password')
        .isLength({min: 6})
        .withMessage('Must be at lease six length character'), 
    
];

export const userSignInValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email addresss'),
    check('password')
        .isLength({min: 6})
        .withMessage('Must be at lease six length character'), 
    
];

