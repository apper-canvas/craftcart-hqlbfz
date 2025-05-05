import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  AuthContainer,
  FormInput,
  FormButton,
  SocialButton,
  FormDivider,
  AuthFooter
} from '../components/auth/AuthForms';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await register(formData);
    if (success) {
      navigate('/profile');
    }
  };
  
  // Social registration handlers
  const handleSocialRegister = (provider) => {
    // In a real app, this would redirect to OAuth provider
    toast.info(`${provider} registration will be implemented soon`);
  };
  
  return (
    <AuthContainer
      title="Create your account"
      subtitle="Join CraftCart to discover handcrafted treasures"
    >
      <form className="space-y-6" onSubmit={handleRegister}>
        <FormInput
          label="Full name"
          type="text"
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <FormInput
          label="Email address"
          type="email"
          id="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <FormInput
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <FormInput
          label="Confirm password"
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-surface-300 dark:border-surface-600 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeTerms" className="font-medium text-surface-700 dark:text-surface-300">
              I agree to the <a href="/terms" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">Terms of Service</a> and <a href="/privacy" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">Privacy Policy</a>
            </label>
            {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
          </div>
        </div>
        
        <FormButton type="submit" loading={loading} fullWidth>
          Register
        </FormButton>
        
        <FormDivider text="Or register with" />
        
        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            icon="Google"
            onClick={() => handleSocialRegister('Google')}
            background="bg-red-600"
            hoverBackground="hover:bg-red-700"
          >
            Google
          </SocialButton>
          
          <SocialButton
            icon="Apple"
            onClick={() => handleSocialRegister('Apple')}
            background="bg-gray-800"
            hoverBackground="hover:bg-gray-900"
          >
            Apple
          </SocialButton>
        </div>
      </form>
      
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkPath="/signin"
      />
    </AuthContainer>
  );
};

export default Register;