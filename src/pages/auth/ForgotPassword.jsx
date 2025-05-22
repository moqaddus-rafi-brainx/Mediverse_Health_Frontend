import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { emailRegex } from '../../constants';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('');
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const isFormValid = () => {
    return email && validateEmail(email) && !emailError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!isFormValid()) {
      return;
    }

    try {
      const { message, link } = await forgotPassword(email,setIsLoading);
      setIsLoading(false);
      setMessage(message);

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

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="bg-white p-7 rounded-lg shadow-lg w-[360px]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#3B7DB2] bg-opacity-10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#3B7DB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-[24px] font-semibold text-gray-800">
              Can't log in?
            </h2>
          </div>
          <p className="text-gray-600 text-sm mb-7">
            Restore access to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {isLoading && (
              <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Sending Email...</span>
              </div>
            )}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                We will send a recovery link to
              </p>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-3 py-2.5 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Your e-mail"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
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
              Send link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the link?{' '}
              <button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`text-[#3B7DB2] hover:text-[#346A96] font-medium ${
                  !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 