import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

function Home() {
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await api.get('/api/products/top')
        setTopProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTopProducts()
  }, [])

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to ShopEasy 🛍️
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Discover amazing products at unbeatable prices
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition text-lg"
          >
            Shop Now
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-blue-500 transition text-lg"
          >
            Join Free
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', icon: '💻', color: 'bg-blue-100 text-blue-600' },
            { name: 'Footwear', icon: '👟', color: 'bg-green-100 text-green-600' },
            { name: 'Clothing', icon: '👕', color: 'bg-purple-100 text-purple-600' },
            { name: 'Books', icon: '📚', color: 'bg-orange-100 text-orange-600' },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`${cat.color} p-6 rounded-xl text-center hover:shadow-md transition`}
            >
              <p className="text-4xl mb-2">{cat.icon}</p>
              <p className="font-semibold text-lg">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Products Section */}
      {topProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ⭐ Top Rated Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Choose ShopEasy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🚚',
              title: 'Fast Delivery',
              desc: 'Get your products delivered within 2-3 business days across India',
            },
            {
              icon: '🔒',
              title: 'Secure Payment',
              desc: 'Your payments are 100% secure with Razorpay encryption',
            },
            {
              icon: '↩️',
              title: 'Easy Returns',
              desc: '7 day hassle free return policy on all products',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
            >
              <p className="text-4xl mb-3">{feature.icon}</p>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-3">
          🎉 Special Offer!
        </h2>
        <p className="text-lg mb-6 text-orange-100">
          Register now and get exclusive deals on your first order
        </p>
        <Link
          to="/register"
          className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition"
        >
          Get Started
        </Link>
      </div>

    </div>
  )
}

export default Home;