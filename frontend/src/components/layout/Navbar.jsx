import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice.js'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold ml-4">
        ShopEasy
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-10">
        <Link to="/products" className="hover:text-blue-200 transition">
          Products
        </Link>

        {user ? (
          <>
            <Link to="/cart" className="hover:text-blue-200 transition">
              Cart
            </Link>
            <Link to="/orders" className="hover:text-blue-200 transition">
              Orders
            </Link>

            {user.role === 'admin' && (
              <Link to="/admin/dashboard" className="hover:text-blue-200 transition">
                Admin
              </Link>
            )}

            <div className="flex items-center gap-3">
              <span className="text-blue-200 text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-200 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;