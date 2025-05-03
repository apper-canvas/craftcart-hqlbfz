import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart, selectCartItems, selectCartTotal } from '../../features/cart/cartSlice';
import { processOrder, sendOrderConfirmationEmail } from '../../features/cart/cartAPI';
import getIcon from '../../utils/iconUtils';

// Form steps
const STEPS = {
  ACCOUNT: 0,
  SHIPPING: 1,
  PAYMENT: 2,
  REVIEW: 3
};

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  // Icons
  const UserIcon = getIcon('User');
  const TruckIcon = getIcon('Truck');
  const CreditCardIcon = getIcon('CreditCard');
  const CheckIcon = getIcon('Check');
  const ArrowRightIcon = getIcon('ArrowRight');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  // Form state
  const [currentStep, setCurrentStep] = useState(STEPS.ACCOUNT);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    accountType: 'guest',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phoneNumber: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePaymentInfo: false
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === STEPS.ACCOUNT) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (formData.accountType === 'create' && !formData.password) {
        newErrors.password = 'Password is required';
      }
    }
    
    if (currentStep === STEPS.SHIPPING) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (currentStep === STEPS.PAYMENT) {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Format must be MM/YY';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      setIsProcessing(true);
      
      try {
        // Process the order
        const orderData = {
          items: cartItems,
          customer: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phoneNumber: formData.phoneNumber
          },
          total: cartTotal,
          date: new Date().toISOString()
        };
        
        const result = await processOrder(orderData);
        
        // Send confirmation email
        await sendOrderConfirmationEmail(formData.email, result);
        
        // Clear the cart
        dispatch(clearCart());
        
        // Navigate to confirmation page
        navigate('/order-confirmation', { state: { order: result } });
        
        // Show success message
        toast.success('Order placed successfully!', {
          position: "bottom-right",
          autoClose: 3000
        });
      } catch (error) {
        console.error('Error processing order:', error);
        toast.error('Failed to process order. Please try again.', {
          position: "bottom-right",
          autoClose: 3000
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex justify-between mb-8">
        {Object.values(STEPS).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step
                  ? 'bg-primary text-white'
                  : currentStep > step
                  ? 'bg-green-500 text-white'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
              }`}
            >
              {currentStep > step ? (
                <CheckIcon className="w-5 h-5" />
              ) : step === STEPS.ACCOUNT ? (
                <UserIcon className="w-5 h-5" />
              ) : step === STEPS.SHIPPING ? (
                <TruckIcon className="w-5 h-5" />
              ) : step === STEPS.PAYMENT ? (
                <CreditCardIcon className="w-5 h-5" />
              ) : (
                <CheckCircleIcon className="w-5 h-5" />
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep === step
                  ? 'text-primary dark:text-primary-light font-medium'
                  : 'text-surface-500 dark:text-surface-400'
              }`}
            >
              {step === STEPS.ACCOUNT
                ? 'Account'
                : step === STEPS.SHIPPING
                ? 'Shipping'
                : step === STEPS.PAYMENT
                ? 'Payment'
                : 'Review'}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  // Render account step
  const renderAccountStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-6">Account Options</h3>
        
        <div className="space-y-4">
          <label className="flex items-start p-4 border rounded-lg cursor-pointer border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
            <input
              type="radio"
              name="accountType"
              value="guest"
              checked={formData.accountType === 'guest'}
              onChange={handleChange}
              className="mt-1 mr-3"
            />
            <div>
              <span className="font-medium">Continue as Guest</span>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Checkout without creating an account
              </p>
            </div>
          </label>
          
          <label className="flex items-start p-4 border rounded-lg cursor-pointer border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
            <input
              type="radio"
              name="accountType"
              value="create"
              checked={formData.accountType === 'create'}
              onChange={handleChange}
              className="mt-1 mr-3"
            />
            <div>
              <span className="font-medium">Create Account</span>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Create an account to track orders and save your information
              </p>
            </div>
          </label>
          
          <label className="flex items-start p-4 border rounded-lg cursor-pointer border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50">
            <input
              type="radio"
              name="accountType"
              value="login"
              checked={formData.accountType === 'login'}
              onChange={handleChange}
              className="mt-1 mr-3"
            />
            <div>
              <span className="font-medium">Login</span>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                Already have an account? Sign in for a faster checkout
              </p>
            </div>
          </label>
        </div>
        
        <div className="pt-6 border-t border-surface-200 dark:border-surface-700">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input w-full ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          {formData.accountType !== 'guest' && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input w-full ${errors.password ? 'border-red-500' : ''}`}
                placeholder={formData.accountType === 'create' ? 'Create password' : 'Enter password'}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render shipping step
  const renderShippingStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input w-full ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input w-full ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`input w-full ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`input w-full ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`input w-full ${errors.state ? 'border-red-500' : ''}`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`input w-full ${errors.zipCode ? 'border-red-500' : ''}`}
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`input w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
            placeholder="(123) 456-7890"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>
    );
  };
  
  // Render payment step
  const renderPaymentStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-6">Payment Information</h3>
        
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium mb-1">
            Name on Card <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={`input w-full ${errors.cardName ? 'border-red-500' : ''}`}
            placeholder="John Doe"
          />
          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
            Card Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`input w-full ${errors.cardNumber ? 'border-red-500' : ''}`}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`input w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
              placeholder="MM/YY"
              maxLength="5"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
              CVV <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className={`input w-full ${errors.cvv ? 'border-red-500' : ''}`}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>
        
        <div className="pt-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="savePaymentInfo"
              checked={formData.savePaymentInfo}
              onChange={handleChange}
              className="rounded border-surface-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-surface-700 dark:text-surface-300">
              Save payment information for future purchases
            </span>
          </label>
        </div>
        
        <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg text-sm text-surface-600 dark:text-surface-400 mt-4">
          <p className="text-surface-700 dark:text-surface-300 font-medium mb-1">Secure Payment</p>
          <p>Your payment information is processed securely. We do not store credit card details.</p>
        </div>
      </div>
    );
  };
  
  // Render review step
  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-6">Review Your Order</h3>
        
        <div className="space-y-6">
          <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
            <h4 className="font-medium mb-2">Account Information</h4>
            <p className="text-surface-600 dark:text-surface-400">
              {formData.email} ({formData.accountType === 'guest' ? 'Guest Checkout' : formData.accountType === 'create' ? 'New Account' : 'Existing Account'})
            </p>
          </div>
          
          <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
            <h4 className="font-medium mb-2">Shipping Address</h4>
            <p className="text-surface-600 dark:text-surface-400">{formData.firstName} {formData.lastName}</p>
            <p className="text-surface-600 dark:text-surface-400">{formData.address}</p>
            <p className="text-surface-600 dark:text-surface-400">
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <p className="text-surface-600 dark:text-surface-400">{formData.country}</p>
            <p className="text-surface-600 dark:text-surface-400">{formData.phoneNumber}</p>
          </div>
          
          <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
            <h4 className="font-medium mb-2">Payment Information</h4>
            <p className="text-surface-600 dark:text-surface-400">
              Ending in {formData.cardNumber.substring(formData.cardNumber.length - 4)}
            </p>
            <p className="text-surface-600 dark:text-surface-400">
              Expires {formData.expiryDate}
            </p>
          </div>
          
          <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
            <h4 className="font-medium mb-3">Order Items ({cartItems.length})</h4>
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-surface-600 dark:text-surface-400 text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mt-6">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
          
          <button
            type="submit"
            className="btn btn-primary w-full py-3 flex justify-center items-center gap-2"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Place Order</span>
                <CheckIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.ACCOUNT:
        return renderAccountStep();
      case STEPS.SHIPPING:
        return renderShippingStep();
      case STEPS.PAYMENT:
        return renderPaymentStep();
      case STEPS.REVIEW:
        return renderReviewStep();
      default:
        return null;
    }
  };
  
  // Render step navigation
  const renderStepNavigation = () => {
    return (
      <div className="flex justify-between mt-8 pt-4 border-t border-surface-200 dark:border-surface-700">
        {currentStep > STEPS.ACCOUNT ? (
          <button
            type="button"
            onClick={handlePrev}
            className="btn btn-outline flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < STEPS.REVIEW ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary flex items-center gap-2"
          >
            <span>Continue</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      {renderStepIndicators()}
      {renderStepContent()}
      {currentStep < STEPS.REVIEW && renderStepNavigation()}
    </form>
  );
};

export default CheckoutForm;