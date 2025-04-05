import { Request, Response } from 'express';
import { getTopUsers } from '../services/userService';

// Get top users with the highest number of posts
export const getTopUsersController = async (req: Request, res: Response) => {
  try {
    const topUsers = await getTopUsers(5); // Get top 5 users
    res.json({ users: topUsers });
  } catch (error) {
    console.error('Error in getTopUsersController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 