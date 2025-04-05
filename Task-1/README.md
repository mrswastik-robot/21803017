# Social Media Analytics HTTP Microservice

This is a microservice that provides real-time analytical insights for a social media platform.

## Features

- Get top users with the highest number of posts
- Get popular posts with the maximum number of comments
- Get latest posts in real-time

## API Endpoints

### Top Users

- **Method**: GET
- **Route**: `/users`
- **Response**: Top five users with the highest number of posts

### Top/Latest Posts

- **Method**: GET
- **Route**: `/posts?type=popular` or `/posts?type=latest`
- **Query Param**: `type` (Accepted Values: `latest`, `popular`)
- **Response**:
  - **Popular**: Top post(s) with the maximum number of comments
  - **Latest**: Latest 5 posts in real-time, with the newest posts first

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server in development mode:
   ```
   npm run dev
   ```

3. For production, build and start:
   ```
   npm run build
   npm start
   ```

## Architecture

- Uses a caching mechanism to minimize API calls to the social media platform
- Implements efficient data structures for tracking user post counts and popular posts
- Handles dynamic data updates in real-time