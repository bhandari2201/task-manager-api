import express from 'express';
import { create, getTasks, update, remove } from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, getTasks);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);

export default router;
