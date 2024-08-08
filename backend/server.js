import express from 'express';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';
import routers from './routes/routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle CORS
app.use(cors({
  origin: '*', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Database connection
dbCon();

// Define your routes
app.use('/api', routers);

// Simple Hello World endpoint
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// Endpoint to return configuration data
app.get('/api/config', (req, res) => {
  res.json({
    backendUrl: process.env.REACT_APP_BACKEND_URL,
    // Add other configuration values as needed
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
