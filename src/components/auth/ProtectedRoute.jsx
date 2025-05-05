import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, don't render anything yet
  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  // If not authenticated, redirect to login page and show a toast message
  if (!isAuthenticated) {
    toast.info('Please sign in to access this page');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;