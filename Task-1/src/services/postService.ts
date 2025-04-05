import { getUsers, getUserPosts, getPostComments, Post } from './apiService';
import NodeCache from 'node-cache';

// Cache for storing post stats
const postStatsCache = new NodeCache({ stdTTL: 30 }); // Cache for 30 seconds for more frequent updates

// Interface for post with comment count
export interface PostWithCommentCount extends Post {
  commentCount: number;
}

// Get all posts across all users
const getAllPosts = async (): Promise<Post[]> => {
  const cacheKey = 'all_posts';
  const cachedPosts = postStatsCache.get<Post[]>(cacheKey);
  
  if (cachedPosts) {
    return cachedPosts;
  }
  
  try {
    const users = await getUsers();
    
    // Get posts for all users in parallel
    const postsPromises = users.map(user => getUserPosts(user.id));
    const userPostsArrays = await Promise.all(postsPromises);
    
    // Flatten the array of arrays into a single array of posts
    const allPosts = userPostsArrays.flat();
    
    // Cache the results
    postStatsCache.set(cacheKey, allPosts);
    
    return allPosts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw error;
  }
};

// Get top popular posts (posts with maximum comments)
export const getPopularPosts = async (): Promise<PostWithCommentCount[]> => {
  const cacheKey = 'popular_posts';
  const cachedPopularPosts = postStatsCache.get<PostWithCommentCount[]>(cacheKey);
  
  if (cachedPopularPosts) {
    return cachedPopularPosts;
  }
  
  try {
    // Get all posts
    const allPosts = await getAllPosts();
    
    // Get comment counts for each post in parallel
    const commentCountPromises = allPosts.map(async (post) => {
      try {
        const comments = await getPostComments(post.id);
        return {
          ...post,
          commentCount: comments.length
        };
      } catch (error) {
        console.error(`Error getting comments for post ${post.id}:`, error);
        return {
          ...post,
          commentCount: 0
        };
      }
    });
    
    // Wait for all promises to resolve
    const postsWithCommentCounts = await Promise.all(commentCountPromises);
    
    // Sort by comment count in descending order
    const sortedPosts = postsWithCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
    
    // If there are posts with comments
    if (sortedPosts.length > 0) {
      // Get the highest comment count
      const maxCommentCount = sortedPosts[0].commentCount;
      
      // Filter to get all posts with the maximum comment count
      const mostPopularPosts = sortedPosts.filter(post => post.commentCount === maxCommentCount);
      
      // Cache the results
      postStatsCache.set(cacheKey, mostPopularPosts);
      
      return mostPopularPosts;
    }
    
    // If no posts with comments, return empty array
    return [];
  } catch (error) {
    console.error('Error getting popular posts:', error);
    throw error;
  }
};

// Get latest posts
export const getLatestPosts = async (limit: number = 5): Promise<Post[]> => {
  const cacheKey = `latest_posts_${limit}`;
  const cachedLatestPosts = postStatsCache.get<Post[]>(cacheKey);
  
  if (cachedLatestPosts) {
    return cachedLatestPosts;
  }
  
  try {
    // Get all posts
    const allPosts = await getAllPosts();
    
    // Sort by timestamp in descending order (newest first) and take top 'limit'
    const latestPosts = allPosts
      .sort((a, b) => {
        const timestampA = a.timestamp || 0;
        const timestampB = b.timestamp || 0;
        return timestampB - timestampA;
      })
      .slice(0, limit);
    
    // Cache the results
    postStatsCache.set(cacheKey, latestPosts);
    
    return latestPosts;
  } catch (error) {
    console.error('Error getting latest posts:', error);
    throw error;
  }
}; 