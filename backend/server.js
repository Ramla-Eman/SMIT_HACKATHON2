import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import {errorHandler} from './middleware/errorhandler.js'
import { adminLimiter, feedbackLimiter } from './middleware/rateLimiter.js'
import feedbackRoutes from './routes/feedbackroutes.js'
import adminRoutes from './routes/adminroutes.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// connect to MongoDb
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Rate limiting for feedback submission
// app.use('/api/feedback', rateLimiter);
// Apply different rate limiters to different routes
app.use('/api/feedback', feedbackLimiter); // Strict for public feedback
app.use('/api/admin', adminLimiter);       // More lenient for admin

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// error handling middleware
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})