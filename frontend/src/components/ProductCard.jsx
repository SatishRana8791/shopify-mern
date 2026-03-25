import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition block"
    >
      <img
        src={product.images[0] || 'https://placehold.co/300x200'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2 truncate">
          {product.category}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-600 font-bold text-lg">
            ₹{product.price}
          </span>
          <span className="text-yellow-500 text-sm">
            ⭐ {product.ratings.toFixed(1)}
          </span>
        </div>
        <div className="block text-center bg-blue-500 text-white py-2 rounded text-sm">
          View Details
        </div>
      </div>
    </Link>
  )
}

export default ProductCard;