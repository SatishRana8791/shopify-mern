import { useEffect, useState } from 'react'
import api from '../../services/api.js'

function UserManager() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/api/users')
        setUsers(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/users/${id}`)
        const { data } = await api.get('/api/users')
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (loading) return <div className="text-center py-10">Loading users...</div>

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No users found</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
            <span>Name</span>
            <span className="col-span-2">Email</span>
            <span>Role</span>
            <span>Action</span>
          </div>
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-5 p-4 border-t items-center text-sm hover:bg-gray-50"
            >
              <span className="font-medium">{user.name}</span>
              <span className="col-span-2 text-gray-600">{user.email}</span>
              <span>
                {user.role === 'admin' ? (
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
                    Admin
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                    User
                  </span>
                )}
              </span>
              <span>
                {user.role !== 'admin' && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                  >
                    Delete
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

export default UserManager;