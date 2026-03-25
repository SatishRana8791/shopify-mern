import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api.js'

function OrderManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders')
        setOrders(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleDeliver = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        await api.put(`/api/orders/${id}/deliver`)
        const { data } = await api.get('/api/orders')
        setOrders(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (loading) return <div className="text-center py-10">Loading orders...</div>

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No orders found</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
            <span>Order ID</span>
            <span className="col-span-2">User</span>
            <span>Total</span>
            <span>Paid</span>
            <span>Delivered</span>
            <span>Action</span>
          </div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-7 p-4 border-t items-center text-sm hover:bg-gray-50"
            >
              <Link
                to={`/orders/${order._id}`}
                className="text-blue-500 hover:underline"
              >
                #{order._id.slice(-8)}
              </Link>
              <span className="col-span-2 text-gray-600">
                {order.user?.name || 'Unknown'}
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
              <span>
                {!order.isDelivered && (
                  <button
                    onClick={() => handleDeliver(order._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-xs"
                  >
                    Deliver
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderManager;