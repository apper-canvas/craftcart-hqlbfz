import { useState } from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';

// Form input component
export const FormInput = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  error,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-surface-900 dark:text-white bg-white dark:bg-surface-800 border ${
          error ? 'border-red-500' : isFocused ? 'border-primary' : 'border-surface-300 dark:border-surface-600'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-150`}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Form button component
export const FormButton = ({ type, onClick, loading, fullWidth, children }) => {
  const LoaderIcon = getIcon('Loader2');
  
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={loading}
      className={`flex justify-center items-center px-6 py-2 ${
        fullWidth ? 'w-full' : ''
      } bg-primary hover:bg-primary-dark text-white rounded-lg transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <>
          <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Social login button
export const SocialButton = ({ icon, onClick, background, hoverBackground, children }) => {
  const Icon = getIcon(icon);
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex justify-center items-center w-full px-4 py-2 ${background} ${hoverBackground} text-white rounded-lg transition duration-150`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </button>
  );
};

// Auth container component
export const AuthContainer = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-surface-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-surface-600 dark:text-surface-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-surface-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-surface-200 dark:border-surface-700">
          {children}
        </div>
      </div>
    </div>
  );
};

// Form divider with text
export const FormDivider = ({ text }) => {
  return (
    <div className="mt-6 mb-6 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-surface-300 dark:border-surface-600"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white dark:bg-surface-800 text-surface-500 dark:text-surface-400">
          {text}
        </span>
      </div>
    </div>
  );
};

// Auth footer with links
export const AuthFooter = ({ text, linkText, linkPath }) => {
  return (
    <p className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
      {text}{' '}
      <Link to={linkPath} className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light">
        {linkText}
      </Link>
    </p>
  );
};