import express from 'express';
import { create,getOne,getAll } from '../controllers/project.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);

export default router;