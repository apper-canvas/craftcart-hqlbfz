import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';
import ReviewModeration from './components/reviews/ReviewModeration';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import CategoryPage from './pages/CategoryPage';
import NewArrivals from './pages/NewArrivals';
import Artisans from './pages/Artisans';
import Sustainability from './pages/Sustainability';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Shipping from './pages/Shipping';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/reviews" element={<ReviewModeration />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            
            {/* Authentication routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Category pages */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            
            {/* Company pages */}
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Policy pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/shipping" element={<Shipping />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;