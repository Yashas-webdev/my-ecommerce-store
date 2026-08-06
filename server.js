import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './backend/config/db.js'

import productRoutes from './backend/routes/productRoutes.js'
import userRoutes from './backend/routes/userRoutes.js'
import orderRoutes from './backend/routes/orderRoutes.js'
import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

const PORT = process.env.PORT || 5000

// Essential Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root / Health check route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Elegant Shop API is running smoothly',
    status: 'success'
  })
})

// API Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Custom Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})
