import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/auth.middleware.js';
import {
  createTaskValidator,
  taskIdValidator
} from '../validators/task.validator.js';

const router = express.Router();

router.use(protect);

router.post('/', createTaskValidator, validate, taskController.create);

router.get('/', taskController.getAll);

router.put(
  '/:id',
  taskIdValidator,
  validate,
  taskController.update
);

router.delete(
  '/:id',
  taskIdValidator,
  validate,
  taskController.remove
);

export default router;