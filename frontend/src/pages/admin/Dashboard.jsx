import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api.js'

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          api.get('/api/orders'),
          api.get('/api/products'),
          api.get('/api/users'),
        ])

        const orders = ordersRes.data
        const totalRevenue = orders.reduce(
          (acc, order) => acc + order.totalPrice, 0
        )

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalProducts: productsRes.data.total,
          totalUsers: usersRes.data.length,
        })

        setRecentOrders(orders.slice(0, 5))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Orders</h3>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold">₹{stats.totalRevenue}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Products</h3>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Users</h3>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/products"
          className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">📦</p>
          <p className="font-semibold text-gray-700">Manage Products</p>
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">🛒</p>
          <p className="font-semibold text-gray-700">Manage Orders</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">👥</p>
          <p className="font-semibold text-gray-700">Manage Users</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <div className="grid grid-cols-5 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
          <span>Order ID</span>
          <span>User</span>
          <span>Total</span>
          <span>Paid</span>
          <span>Delivered</span>
        </div>
        {recentOrders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-5 p-4 border-t items-center text-sm hover:bg-gray-50"
          >
            <Link
              to={`/orders/${order._id}`}
              className="text-blue-500 hover:underline"
            >
              #{order._id.slice(-8)}
            </Link>
            <span className="text-gray-600">
              {order.user?.name || 'Unknown'}
            </span>
            <span className="font-medium">₹{order.totalPrice}</span>
            <span>
              {order.isPaid ? (
                <span className="text-green-500">✓ Paid</span>
              ) : (
                <span className="text-red-500">✗ Not Paid</span>
              )}
            </span>
            <span>
              {order.isDelivered ? (
                <span className="text-green-500">✓ Delivered</span>
              ) : (
                <span className="text-yellow-500">⏳ Processing</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;