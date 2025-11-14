import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

// Example routes - customize for your application
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);

export default router;