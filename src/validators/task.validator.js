import {body, param} from 'express-validator';

export const createTaskValidator = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
    body('status')
        .optional()
        .isIn(['todo', 'in-progress', 'done'])
        .withMessage('Status must be one of: todo, in-progress, done'),
    body('project')
        .isMongoId()
        .withMessage('Invalid Project ID'),
    body('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Invalid User ID')
];

export const taskIdValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Task ID')
];
