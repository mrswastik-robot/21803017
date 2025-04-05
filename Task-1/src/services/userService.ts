import { getUsers, getUserPosts, User } from './apiService';
import NodeCache from 'node-cache';

// Cache for storing user stats
const userStatsCache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

// Interface for user with post count
export interface UserWithPostCount extends User {
  postCount: number;
}

// Get top users with the highest number of posts
export const getTopUsers = async (limit: number = 5): Promise<UserWithPostCount[]> => {
  const cacheKey = `top_users_${limit}`;
  const cachedTopUsers = userStatsCache.get<UserWithPostCount[]>(cacheKey);
  
  if (cachedTopUsers) {
    return cachedTopUsers;
  }

  try {
    // Get all users
    const users = await getUsers();
    
    // Array to store users with their post counts
    const usersWithPostCount: UserWithPostCount[] = [];
    
    // Get post counts for each user in parallel
    const postCountPromises = users.map(async (user) => {
      try {
        const posts = await getUserPosts(user.id);
        return {
          ...user,
          postCount: posts.length
        };
      } catch (error) {
        console.error(`Error getting posts for user ${user.id}:`, error);
        return {
          ...user,
          postCount: 0
        };
      }
    });
    
    // Wait for all promises to resolve
    const results = await Promise.all(postCountPromises);
    
    // Sort by post count in descending order and take top 'limit'
    const topUsers = results
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, limit);
    
    // Cache the results
    userStatsCache.set(cacheKey, topUsers);
    
    return topUsers;
  } catch (error) {
    console.error('Error getting top users:', error);
    throw error;
  }
}; 