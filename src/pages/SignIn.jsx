import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const from = location.state?.from?.pathname || '/profile';
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await login(formData);
    if (success) {
      navigate(from, { replace: true });
    }
  };
  
  // Social login handlers
  const handleSocialLogin = (provider) => {
    // In a real app, this would redirect to OAuth provider
    toast.info(`${provider} login will be implemented soon`);
  };
  
  return (
    <AuthContainer
      title="Sign in to your account"
      subtitle="Access your CraftCart profile to manage orders and more"
    >
      <form className="space-y-6" onSubmit={handleLogin}>
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
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-surface-300 dark:border-surface-600 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-surface-700 dark:text-surface-300">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Password reset will be implemented soon'); }} className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <FormButton type="submit" loading={loading} fullWidth>
          Sign in
        </FormButton>
        
        <FormDivider text="Or continue with" />
        
        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            icon="Facebook"
            onClick={() => handleSocialLogin('Facebook')}
            background="bg-blue-600"
            hoverBackground="hover:bg-blue-700"
          >
            Facebook
          </SocialButton>
          
          <SocialButton
            icon="Github"
            onClick={() => handleSocialLogin('Github')}
            background="bg-gray-800"
            hoverBackground="hover:bg-gray-900"
          >
            GitHub
          </SocialButton>
        </div>
      </form>
      
      <AuthFooter
        text="Don't have an account?"
        linkText="Register now"
        linkPath="/register"
      />
    </AuthContainer>
  );
};

export default SignIn;