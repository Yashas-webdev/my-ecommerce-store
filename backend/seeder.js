import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // Clear existing records
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Insert sample users
    const createdUsers = await User.create(users)
    const adminUser = createdUsers[0]._id

    // Attach admin user ID as owner to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // Insert sample products
    await Product.insertMany(sampleProducts)

    console.log(' Data imported successfully into MongoDB!')
    process.exit()
  } catch (error) {
    console.error(` Error with data import: ${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('🗑️ Data destroyed successfully from MongoDB!')
    process.exit()
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`)
    process.exit(1)
  }
}

// Check CLI arguments
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
