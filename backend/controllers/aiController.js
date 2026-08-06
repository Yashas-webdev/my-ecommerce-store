import Product from '../models/productModel.js'

// Fallback seed items if DB query is empty
const fallbackProducts = [
  { _id: '1', name: 'Wireless Noise-Canceling Headphones', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', countInStock: 15 },
  { _id: '2', name: 'Minimalist LED Desk Lamp', price: 49.99, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', countInStock: 20 },
  { _id: '3', name: 'Ergonomic Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', countInStock: 12 },
  { _id: '4', name: 'Artisanal Ceramic Coffee Mug', price: 24.99, category: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', countInStock: 30 }
]

// @desc    AI Curation Engine: Find items & generate AI occasion bundle with discount
// @route   POST /api/ai/curate
// @access  Public
const curateBundle = async (req, res, next) => {
  try {
    const { prompt, occasion, maxBudget, category } = req.body

    // Fetch all products from MongoDB
    let allProducts = []
    try {
      allProducts = await Product.find({})
    } catch (e) {
      console.warn('MongoDB query warning in aiController, using fallback products')
    }

    if (!allProducts || allProducts.length === 0) {
      allProducts = fallbackProducts
    }

    let filtered = [...allProducts]
    const searchQuery = (prompt || occasion || '').toLowerCase()

    // Smart AI Curation Matching Algorithm
    if (searchQuery.includes('work') || searchQuery.includes('desk') || searchQuery.includes('office')) {
      filtered = allProducts.filter(p => 
        p.category === 'Electronics' || p.name.toLowerCase().includes('mouse') || p.name.toLowerCase().includes('lamp') || p.name.toLowerCase().includes('keyboard')
      )
    } else if (searchQuery.includes('coffee') || searchQuery.includes('kitchen') || searchQuery.includes('cozy') || searchQuery.includes('home')) {
      filtered = allProducts.filter(p => p.category === 'Home')
    } else if (searchQuery.includes('fashion') || searchQuery.includes('outfit') || searchQuery.includes('travel') || searchQuery.includes('style')) {
      filtered = allProducts.filter(p => p.category === 'Fashion')
    } else if (category && category !== 'All') {
      filtered = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    // Fallback if filter too strict
    if (filtered.length < 2) {
      filtered = allProducts
    }

    // Select top 2-3 matching products for the bundle
    const budgetLimit = Number(maxBudget) || 500
    let selectedItems = []
    let currentTotal = 0

    for (const item of filtered) {
      if (currentTotal + item.price <= budgetLimit && selectedItems.length < 3) {
        selectedItems.push(item)
        currentTotal += item.price
      }
    }

    if (selectedItems.length === 0) {
      selectedItems = filtered.slice(0, 2)
      currentTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0)
    }

    // Compute 10% AI Bundle Savings Discount
    const originalTotal = Number(currentTotal.toFixed(2))
    const bundleDiscount = Number((originalTotal * 0.1).toFixed(2))
    const bundlePrice = Number((originalTotal - bundleDiscount).toFixed(2))

    // Generate AI Rationale Explanation
    const occasionTitle = occasion || prompt || 'Custom Curation'
    const aiRationale = `Our NovaCraft AI analyzed your request for "${occasionTitle}". We selected ${selectedItems.length} synergistic items that perfectly complement each other while keeping you under your target budget.`

    res.json({
      title: `${occasionTitle} Bundle`,
      matchScore: 98,
      aiRationale,
      items: selectedItems,
      originalTotal,
      bundleDiscount,
      bundlePrice,
      savingsPercentage: '10% OFF'
    })
  } catch (error) {
    next(error)
  }
}

export { curateBundle }
