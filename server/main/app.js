import e from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'

import {__dirname} from '../utils/dirname.js'
import { limiter } from '../utils/rateLimiter.js'
import logger from '../utils/logger.js'

import { router as indexMainRouter } from './routes/indexMain.js'

const app = e()

app.use(limiter) // Apply rate limiting middleware to all requests
app.use(helmet()) // Apply security headers to all requests
app.use(cors()) // Enable CORS for all requests
app.use(e.json()) // Parse incoming JSON requests
app.use(logger) // Log all requests using morgan

app.use('/url', e.static(path.join(__dirname, '../../frontend/public'))) // Serve static files from the frontend/public directory

app.set('views', path.join(__dirname, '../../frontend/views')) // Set the views directory to the frontend/views directory
app.set('view engine', 'ejs') // Set the view engine to EJS


app.use('/', indexMainRouter) // Use the indexMainRouter for the root route


// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})
// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: { message: err.message, status },
  });
});

export default app