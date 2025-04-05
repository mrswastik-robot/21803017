import axios from 'axios';

// Define base URL - use relative URL to leverage Next.js API route rewrites
const baseURL = '/api';

// Define types
export interface User {
  id: string;
  name: string;
  postCount: number;
}

export interface Post {
  id: string;
  userid: string;
  content: string;
  timestamp?: number;
  commentCount?: number;
}

// Create API client
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getTopUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<{ users: User[] }>('/users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

export const getPopularPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<{ posts: Post[] }>('/posts?type=popular');
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }
};

export const getLatestPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<{ posts: Post[] }>('/posts?type=latest');
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}; 