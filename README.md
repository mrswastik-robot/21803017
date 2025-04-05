# Social Media Analytics Application

This project consists of a backend microservice (Task-1) and a frontend web application (Task-2) for displaying social media analytics.

## Project Structure

- **Task-1:** Backend HTTP microservice providing real-time social media analytics APIs
- **Task-2:** Frontend React application that consumes the backend APIs

## Setup and Running

### Install Dependencies for Both Projects

```bash
npm run install-all
```

### Running Both Services

```bash
npm run dev
```

This will start both the backend server on port 3001 and the frontend application on port 3000.

### Running Individual Services

**Backend Only:**
```bash
npm run backend
```

**Frontend Only:**
```bash
npm run frontend
```

## API Endpoints (Task-1)

- GET `/users` - Get top five users with the highest number of posts
- GET `/posts?type=popular` - Get posts with the maximum number of comments
- GET `/posts?type=latest` - Get latest 5 posts in real-time

## Frontend Pages (Task-2)

- `/` - Top Users page displaying users with the most posts
- `/trending-posts` - Trending Posts page showing posts with maximum comments
- `/feed` - Feed page displaying latest posts with real-time updates 