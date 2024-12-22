import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { validateEmail, validatePassword, validatePasswordMatch } from '../utils/validation';
import { useFormError } from '../hooks/useFormError';
import axiosInstance from '/axiosConfig';

export function SignUp({ onSwitchMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { errors, setError, clearError, clearAllErrors } = useFormError();
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setError('name', 'Name is required');
      isValid = false;
    } else {
      clearError('name');
    }

    if (!email) {
      setError('email', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setError('email', 'Please enter a valid email');
      isValid = false;
    } else {
      clearError('email');
    }

    if (!password) {
      setError('password', 'Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setError('password', 'Password must be at least 8 characters');
      isValid = false;
    } else {
      clearError('password');
    }

    if (!confirmPassword) {
      setError('confirmPassword', 'Please confirm your password');
      isValid = false;
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      setError('confirmPassword', 'Passwords do not match');
      isValid = false;
    } else {
      clearError('confirmPassword');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();
  
    

    if (validateForm()) {
      try {
        const response = await axiosInstance.post('/api/signup/', {
          name,
          email,
          password,
        });
  
        console.log('Signup successful:', response.data);
  
        // Redirect to the home page on success
        navigate('/home'); // Ensure this is correctly set up
      } catch (error) {
        if (error.response && error.response.data) {
          console.error(error.response.data.error);
          setError('email', error.response.data.error);
        } else {
          console.error('An unexpected error occurred.');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthCard title="Create Account">
        <AuthInput
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
        />
        <AuthButton type="submit">Create Account</AuthButton>
        
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchMode} className="link">
            Sign In
          </button>
        </p>
      </AuthCard>
    </form>
  );
}
