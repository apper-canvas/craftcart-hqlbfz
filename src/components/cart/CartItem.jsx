import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';
import getIcon from '../../utils/iconUtils';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Get icons
  const MinusIcon = getIcon('Minus');
  const PlusIcon = getIcon('Plus');
  const TrashIcon = getIcon('Trash2');
  
  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    
    // Simulate API delay
    setTimeout(() => {
      setIsUpdating(false);
      toast.success('Cart updated', {
        position: "bottom-right",
        autoClose: 2000
      });
    }, 300);
  };
  
  // Handle item removal
  const handleRemove = () => {
    dispatch(removeItem(item.id));
    toast.info(`${item.name} removed from cart`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center p-4 border-b border-surface-200 dark:border-surface-700 gap-4">
      {/* Product image */}
      <div className="w-24 h-24 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="flex-1 sm:ml-4 w-full sm:w-auto">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-surface-500 dark:text-surface-400">{item.category}</p>
        <p className="font-semibold text-primary dark:text-primary-light mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>
      
      {/* Quantity controls */}
      <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg">
        <button 
          className="px-3 py-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 disabled:opacity-50"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || isUpdating}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        
        <span className="px-3 py-1 min-w-[32px] text-center">
          {isUpdating ? '...' : item.quantity}
        </span>
        
        <button 
          className="px-3 py-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 disabled:opacity-50"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      
      {/* Item total */}
      <div className="text-right sm:ml-4 sm:min-w-[80px]">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      {/* Remove button */}
      <button 
        className="text-surface-500 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400 transition-colors"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;