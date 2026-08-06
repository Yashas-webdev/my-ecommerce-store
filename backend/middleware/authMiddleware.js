import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Protect routes - requires valid JWT bearer token
const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        res.status(401)
        throw new Error('User account not found')
      }

      next()
    } catch (error) {
      console.error('Auth Middleware Error:', error.message)
      res.status(401)
      throw new Error('Not authorized, token validation failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, missing bearer token')
  }
}

// Admin middleware - restricts access to admin users only
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
