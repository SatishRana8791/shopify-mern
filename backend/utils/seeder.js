import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'
import User from '../models/User.js'

dotenv.config()

const products = [
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with air cushioning technology. Perfect for daily wear and light workouts.',
    price: 7999,
    category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    stock: 50,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Apple iPhone 15',
    description: 'Latest iPhone with A16 Bionic chip, 48MP camera, and all day battery life.',
    price: 79999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
    stock: 20,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Samsung 4K Smart TV 55"',
    description: 'Crystal clear 4K display with smart features, Netflix, YouTube built in.',
    price: 49999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500'],
    stock: 15,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: "Levi's 511 Slim Jeans",
    description: 'Classic slim fit jeans made from premium denim. Available in multiple colors.',
    price: 2999,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    stock: 100,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry leading noise cancellation with 30 hour battery life and premium sound.',
    price: 24999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    stock: 30,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'High performance running shoes with boost cushioning and primeknit upper.',
    price: 9999,
    category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'],
    stock: 40,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'The Alchemist - Paulo Coelho',
    description: 'A magical story about following your dreams. One of the best selling books of all time.',
    price: 299,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    stock: 200,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'HP Pavilion Laptop 15',
    description: 'Powerful laptop with Intel i5 processor, 8GB RAM, 512GB SSD for everyday computing.',
    price: 54999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
    stock: 25,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Allen Solly Formal Shirt',
    description: 'Premium cotton formal shirt perfect for office wear. Available in multiple colors.',
    price: 1499,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
    stock: 80,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Puma Running Shoes',
    description: 'Lightweight and breathable running shoes with advanced cushioning technology.',
    price: 4999,
    category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500'],
    stock: 60,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Atomic Habits - James Clear',
    description: 'The life changing million copy bestseller about building good habits.',
    price: 499,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500'],
    stock: 150,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Flagship Android smartphone with 200MP camera and all day battery.',
    price: 69999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    stock: 25,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'H&M Summer Dress',
    description: 'Lightweight floral summer dress perfect for casual outings.',
    price: 1999,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'],
    stock: 70,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Apple MacBook Air M2',
    description: 'Supercharged by M2 chip with 18 hour battery life and stunning display.',
    price: 114999,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1611186871525-12a67d1d7661?w=500'],
    stock: 15,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'The number 1 personal finance book of all time by Robert Kiyosaki.',
    price: 399,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500'],
    stock: 180,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
  {
    name: 'Nike Dri-FIT T-Shirt',
    description: 'Moisture wicking athletic t-shirt perfect for workouts and sports.',
    price: 1299,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500'],
    stock: 120,
    ratings: 0,
    numReviews: 0,
    reviews: [],
  },
]

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')

    // Get admin user
    const adminUser = await User.findOne({ role: 'admin' })
    if (!adminUser) {
      console.log('No admin user found! Please create an admin user first.')
      process.exit(1)
    }

    // Delete existing products
    await Product.deleteMany({})
    console.log('Existing products deleted')

    // Add createdBy to each product
    const productsWithUser = products.map((p) => ({
      ...p,
      createdBy: adminUser._id,
    }))

    // Insert products
    await Product.insertMany(productsWithUser)
    console.log(`${products.length} products inserted successfully!`)

    process.exit(0)
  } catch (error) {
    console.log('Error:', error.message)
    process.exit(1)
  }
}

seedProducts();