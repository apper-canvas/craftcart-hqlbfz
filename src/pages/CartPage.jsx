import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartShipping, 
  selectCartTax, 
  selectCartTotal,
  updateQuantity,
  removeItem
} from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);

  // Get icons
  const TrashIcon = getIcon('Trash2');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  const ShoppingBagIcon = getIcon('ShoppingBag');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      toast.success('Cart updated');
    }
  };

  const handleRemoveItem = (id, name) => {
    dispatch(removeItem(id));
    toast.success(`${name} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBagIcon className="mx-auto w-16 h-16 text-surface-300 mb-4" />
          <h1 className="text-2xl font-bold text-surface-800 mb-4">Your cart is empty</h1>
          <p className="text-surface-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/categories" 
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-150"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-surface-800">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 p-4 text-sm font-medium text-surface-500 bg-surface-50">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="border-t border-surface-100 p-4 md:grid md:grid-cols-12 md:items-center">
                <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                  <div className="w-20 h-20 flex-shrink-0 mr-4 bg-surface-100 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-surface-800 font-medium">{item.name}</h3>
                    <p className="text-surface-500 text-sm">{item.variant || 'Standard'}</p>
                    <button 
                      className="text-red-500 text-sm flex items-center mt-2 md:hidden"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2 text-center mb-4 md:mb-0">
                  <span className="text-surface-800">${item.price.toFixed(2)}</span>
                </div>
                
                <div className="md:col-span-2 flex items-center justify-center mb-4 md:mb-0">
                  <div className="flex items-center border border-surface-200 rounded-md">
                    <button 
                      className="p-2 text-surface-600 hover:text-primary focus:outline-none"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-2 py-1 text-surface-800 w-8 text-center">{item.quantity}</span>
                    <button 
                      className="p-2 text-surface-600 hover:text-primary focus:outline-none"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2 text-center">
                  <span className="text-surface-800 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    className="hidden md:inline-block ml-4 text-red-500"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    aria-label="Remove item"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <Link 
              to="/categories" 
              className="text-primary hover:text-primary-dark font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-surface-800">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-surface-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-surface-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-surface-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-surface-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-surface-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="block w-full bg-primary hover:bg-primary-dark text-white text-center font-semibold py-3 px-4 rounded-lg transition duration-150"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;