import { Request, Response } from 'express';
import { getPopularPosts, getLatestPosts } from '../services/postService';

// Get posts based on type (popular or latest)
export const getPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.query.type as string;
    
    if (!type || (type !== 'popular' && type !== 'latest')) {
      res.status(400).json({ 
        error: 'Invalid query parameter. Type must be either "popular" or "latest"' 
      });
      return;
    }
    
    if (type === 'popular') {
      // Get popular posts
      const popularPosts = await getPopularPosts();
      res.json({ posts: popularPosts });
    } else {
      // Get latest posts
      const latestPosts = await getLatestPosts(5); // Get top 5 latest posts
      res.json({ posts: latestPosts });
    }
  } catch (error) {
    console.error('Error in getPostsController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 