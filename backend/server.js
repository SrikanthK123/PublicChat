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
app.use(cors());

// Database connection
dbCon();

// Define your routes
app.use('/api', routers);

const PORT = process.env.PORT || 4000; // Ensure the port is set to 4000 or any port of your choice
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
