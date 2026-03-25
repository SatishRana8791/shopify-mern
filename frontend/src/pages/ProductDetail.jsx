import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  productDetailStart,
  productDetailSuccess,
  productDetailFail,
} from '../redux/slices/productSlice.js'
import { addToCart } from '../redux/slices/cartSlice.js'
import api from '../services/api.js'

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product, loading, error } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.auth)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState(null)
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(productDetailStart())
        const { data } = await api.get(`/api/products/${id}`)
        dispatch(productDetailSuccess(data))
      } catch (err) {
        dispatch(productDetailFail(err.response?.data?.message || 'Error fetching product'))
      }
    }
    fetchProduct()
    setReviewSuccess(false)
  }, [id, reviewSuccess])

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      stock: product.stock,
      quantity: 1,
    }))
    navigate('/cart')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      setReviewLoading(true)
      setReviewError(null)
      await api.post(`/api/products/${id}/reviews`, { rating, comment })
      setReviewSuccess(true)
      setRating(5)
      setComment('')
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Error submitting review')
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!product) return null

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div>
          <img
            src={product.images[0] || 'https://placehold.co/500x400'}
            alt={product.name}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-4">{product.category}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">⭐ {product.ratings.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({product.numReviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-500 font-medium">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">✗ Out of Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Existing Reviews */}
        {product.reviews.length === 0 ? (
          <p className="text-gray-500 mb-6">No reviews yet — be the first to review!</p>
        ) : (
          <div className="space-y-4 mb-8">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-yellow-500">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Write Review Form */}
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>

            {reviewError && (
              <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                {reviewError}
              </div>
            )}

            {reviewSuccess && (
              <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
                Review submitted successfully!
              </div>
            )}

            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ — Good</option>
                  <option value={3}>⭐⭐⭐ — Average</option>
                  <option value={2}>⭐⭐ — Poor</option>
                  <option value={1}>⭐ — Terrible</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={reviewLoading}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
              >
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">
              Please{' '}
              <a href="/login" className="text-blue-500 hover:underline">
                login
              </a>{' '}
              to write a review
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail;