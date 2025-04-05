import { Router } from 'express';
import { getTopUsersController } from '../controllers/userController';

const router = Router();

// Route for getting top users
router.get('/users', getTopUsersController);

export { router as userRoutes }; 