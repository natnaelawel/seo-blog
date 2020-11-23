import {check} from "express-validator";


export const createTagValidator = [
    check("name")
        .notEmpty()
        .withMessage('Tag Name must n\'t be empty')
]