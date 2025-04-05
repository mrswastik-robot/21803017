import axios from 'axios';
import NodeCache from 'node-cache';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

// Authorization token
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzODM4NDY5LCJpYXQiOjE3NDM4MzgxNjksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZhOWExN2I1LWM4YTctNGY0MC1hOWRiLWUyNGQyODljYjBiNiIsInN1YiI6ImFsb25lZG9lcjU1QGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImFsb25lZG9lcjU1QGdtYWlsLmNvbSIsIm5hbWUiOiJzd2FzdGlrIHBhdGVsIiwicm9sbE5vIjoiMjE4MDM5MTciLCJhY2Nlc3NDb2RlIjoiU3JNUXFSIiwiY2xpZW50SUQiOiI2YTlhMTdiNS1jOGE3LTRmNDAtYTlkYi1lMjRkMjg5Y2IwYjYiLCJjbGllbnRTZWNyZXQiOiJ1eHRKQkpnQ1ZjWWhVR0FQIn0.nZtxL0DBCadno_XbvSo87tGwmncLt-OuMSnMoAec078';

// Configure axios with default headers
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Define interfaces for our data
export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  userid: string;
  content: string;
  timestamp?: number; // We'll add this for sorting purposes
}

export interface Comment {
  id: string;
  postid: string;
  content: string;
}

export interface UsersResponse {
  users: Record<string, string>;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CommentsResponse {
  comments: Comment[];
}

// Function to get all users
export const getUsers = async (): Promise<User[]> => {
  const cacheKey = 'all_users';
  const cachedUsers = cache.get<User[]>(cacheKey);
  
  if (cachedUsers) {
    return cachedUsers;
  }

  try {
    const response = await axios.get<UsersResponse>(`${API_BASE_URL}/users`);
    const usersObject = response.data.users;
    
    // Transform users object to array format for easier processing
    const users: User[] = Object.entries(usersObject).map(([id, name]) => ({
      id,
      name,
    }));
    
    cache.set(cacheKey, users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to get a user's posts
export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const cacheKey = `user_posts_${userId}`;
  const cachedPosts = cache.get<Post[]>(cacheKey);
  
  if (cachedPosts) {
    return cachedPosts;
  }

  try {
    const response = await axios.get<PostsResponse>(`${API_BASE_URL}/users/${userId}/posts`);
    const posts = response.data.posts;
    
    // Add a timestamp for sorting (using current time as we don't have real timestamps)
    const postsWithTimestamp = posts.map(post => ({
      ...post,
      timestamp: Date.now()
    }));
    
    cache.set(cacheKey, postsWithTimestamp);
    return postsWithTimestamp;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

// Function to get comments for a post
export const getPostComments = async (postId: string): Promise<Comment[]> => {
  const cacheKey = `post_comments_${postId}`;
  const cachedComments = cache.get<Comment[]>(cacheKey);
  
  if (cachedComments) {
    return cachedComments;
  }

  try {
    const response = await axios.get<CommentsResponse>(`${API_BASE_URL}/posts/${postId}/comments`);
    const comments = response.data.comments;
    
    cache.set(cacheKey, comments);
    return comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
}; 