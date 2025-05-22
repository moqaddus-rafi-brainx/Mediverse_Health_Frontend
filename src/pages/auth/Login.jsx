import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { emailRegex } from '../../constants';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { login } = useAuth();

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    //email validation
    if (name === 'email') {
      if (!value) {
        setEmailError('');
      } else if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  //used for button disable
  const isFormValid = () => {
    return formData.email && 
           formData.password && 
           validateEmail(formData.email) && 
           !emailError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isFormValid()) {
      return;
    }

    try {
      const { message } = await login(formData.email, formData.password);
      alert(message); //Show success message
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-[40%] bg-[#3B7DB2]" />
        <div className="h-[60%] bg-white" />
      </div>

      {/* Card */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="bg-white p-7 rounded-lg shadow-lg w-[360px]">
          <h2 className="text-[24px] font-semibold text-gray-800 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600 text-sm mb-7">
            Enter your email and password to sign in
          </p>

            {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-3 py-2.5 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#3B7DB2] border-[#3B7DB2]' : 'border-gray-300 bg-white'}`}>
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-2.5 px-4 rounded-md transition-colors duration-200 ${
                isFormValid()
                  ? 'bg-[#3B7DB2] text-white hover:bg-[#346A96]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Can't remember the password?{' '}
              <Link to="/auth/forgot-password" className="text-[#3B7DB2] hover:text-[#346A96]">
                Reset Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 