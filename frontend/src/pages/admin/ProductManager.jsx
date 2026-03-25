import { useEffect, useState } from 'react'
import api from '../../services/api.js'

function ProductManager() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: '',
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products')
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.log('Error:', error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleEdit = (product) => {
    setEditProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      images: product.images[0],
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`)
        const { data } = await api.get('/api/products')
        setProducts(data.products)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.images],
      }

      if (editProduct) {
        await api.put(`/api/products/${editProduct._id}`, productData)
      } else {
        await api.post('/api/products', productData)
      }

      setShowForm(false)
      setEditProduct(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: '',
      })

      const { data } = await api.get('/api/products')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditProduct(null)
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              stock: '',
              images: '',
            })
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              {editProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
            <span>Image</span>
            <span className="col-span-2">Name</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>
          {products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-6 p-4 border-t items-center text-sm"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span className="col-span-2 font-medium">{product.name}</span>
              <span>₹{product.price}</span>
              <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                {product.stock}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductManager;