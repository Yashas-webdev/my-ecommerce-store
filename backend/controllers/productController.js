import Product from '../models/productModel.js'

// @desc    Fetch all products with keyword search, category filter, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { keyword, category, sort } = req.query

    let query = {}

    // Search keyword filter
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' }
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' }
    }

    // Sorting options
    let sortOptions = {}
    if (sort === 'price-low') {
      sortOptions.price = 1
    } else if (sort === 'price-high') {
      sortOptions.price = -1
    } else if (sort === 'rating') {
      sortOptions.rating = -1
    } else {
      sortOptions.createdAt = -1 // Default newest
    }

    const products = await Product.find(query).sort(sortOptions)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.deleteOne()
      res.json({ message: 'Product removed successfully' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, price, image, category, countInStock, description } = req.body

    const product = new Product({
      name: name || 'Sample Product',
      price: price || 0,
      user: req.user._id,
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: category || 'Electronics',
      countInStock: countInStock || 10,
      numReviews: 0,
      rating: 5.0,
      description: description || 'Sample product description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.price = price !== undefined ? price : product.price
      product.description = description || product.description
      product.image = image || product.image
      product.category = category || product.category
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed by you')
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added successfully' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
}
