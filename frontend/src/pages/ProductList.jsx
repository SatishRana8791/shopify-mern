import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  productListStart,
  productListSuccess,
  productListFail,
} from '../redux/slices/productSlice.js'
import api from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

function ProductList() {
  const dispatch = useDispatch()
  const { products, loading, error, pages, page } = useSelector(
    (state) => state.product
  )

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productListStart())
        const { data } = await api.get(
          `/api/products?keyword=${keyword}&category=${category}&page=${currentPage}`
        )
        dispatch(productListSuccess(data))
      } catch (err) {
        dispatch(productListFail(err.response?.data?.message || 'Error fetching products'))
      }
    }
    fetchProducts()
  }, [keyword, category, currentPage])

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:border-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setCurrentPage(x + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === x + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductList;