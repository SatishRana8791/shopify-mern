import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api.js'

function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/api/orders/${id}`)
        setOrder(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching order')
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handlePayment = async () => {
    try {
      setPaymentLoading(true)

      const { data } = await api.post('/api/payment/order', {
        amount: order.totalPrice,
      })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'ShopEasy',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response) => {
          await api.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id,
          })
          window.location.reload()
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
        },
        theme: {
          color: '#3B82F6',
        },
      }

      const razor = new window.Razorpay(options)
      razor.open()
    } catch (err) {
      console.log(err)
    } finally {
      setPaymentLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!order) return null

  return (
    <div className="max-w-4xl mx-auto">

      {/* Order Success Banner */}
      <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg mb-6 text-center">
        <h2 className="text-xl font-bold">🎉 Order Placed Successfully!</h2>
        <p className="text-sm mt-1">Order ID: {order._id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Order Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    {item.quantity} x ₹{item.price}
                  </p>
                </div>
                <span className="font-medium">
                  ₹{item.quantity * item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Info */}
        <div className="space-y-4">

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Shipping Address</h2>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p className="text-gray-600">{order.shippingAddress.pincode}</p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Payment</h2>
            <p className="text-gray-600">Method: {order.paymentMethod}</p>
            <p className={`font-medium mt-1 ${order.isPaid ? 'text-green-500' : 'text-red-500'}`}>
              {order.isPaid ? '✓ Paid' : '✗ Not Paid'}
            </p>
            {!order.isPaid && (
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-medium disabled:opacity-50"
              >
                {paymentLoading ? 'Processing...' : `Pay Now ₹${order.totalPrice}`}
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Items Price</span>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{order.shippingPrice}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Delivery Status</h2>
            <p className={`font-medium ${order.isDelivered ? 'text-green-500' : 'text-yellow-500'}`}>
              {order.isDelivered ? '✓ Delivered' : '⏳ Processing'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/orders"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition mr-4"
        >
          My Orders
        </Link>
        <Link
          to="/products"
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderDetail;