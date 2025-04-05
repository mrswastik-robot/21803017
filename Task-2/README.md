# Social Media Analytics Frontend Web Application

A responsive React frontend application that displays real-time social media analytics.

## Features

- **Top Users**: Displays top five users with the highest number of posts
- **Trending Posts**: Shows posts with the maximum number of comments
- **Feed**: Displays the latest posts in real-time, with automatic updates

## Technology Stack

- React with Next.js
- TypeScript
- Tailwind CSS for styling
- Axios for API communication

## How to Run

1. Make sure the backend server from Task-1 is running on port 3001

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Implementation Details

- Uses API proxy through Next.js to communicate with the backend
- Implements real-time updates in the Feed through polling
- Responsive design that works on both mobile and desktop devices
- Random images generated for users and posts for visual appeal
- Clean and intuitive user interface with Tailwind CSS 