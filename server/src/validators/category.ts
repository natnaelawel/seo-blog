import {check} from 'express-validator';


export const createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is Required!'),
];
