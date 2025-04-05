import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/', postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 