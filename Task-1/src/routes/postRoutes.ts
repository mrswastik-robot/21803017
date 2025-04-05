import { Router } from 'express';
import { getPostsController } from '../controllers/postController';

const router = Router();

// Route for getting posts (popular or latest)
router.get('/posts', getPostsController);

export { router as postRoutes }; 