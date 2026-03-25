import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/mine')
        setOrders(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">No orders found</p>
          <Link
            to="/products"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
            <span>Order ID</span>
            <span>Date</span>
            <span>Items</span>
            <span>Total</span>
            <span>Paid</span>
            <span>Status</span>
          </div>

          {/* Table Rows */}
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-6 p-4 border-t items-center text-sm hover:bg-gray-50 transition"
            >
              <Link
                to={`/orders/${order._id}`}
                className="text-blue-500 hover:underline truncate"
              >
                #{order._id.slice(-8)}
              </Link>
              <span className="text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="text-gray-600">
                {order.orderItems.length} item(s)
              </span>
              <span className="font-medium">₹{order.totalPrice}</span>
              <span>
                {order.isPaid ? (
                  <span className="text-green-500 font-medium">✓ Paid</span>
                ) : (
                  <span className="text-red-500 font-medium">✗ Not Paid</span>
                )}
              </span>
              <span>
                {order.isDelivered ? (
                  <span className="text-green-500 font-medium">✓ Delivered</span>
                ) : (
                  <span className="text-yellow-500 font-medium">⏳ Processing</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders;