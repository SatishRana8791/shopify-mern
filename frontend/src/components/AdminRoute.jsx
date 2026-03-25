import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth)

  return user && user.role === 'admin' ? children : <Navigate to="/" />
}

export default AdminRoute;