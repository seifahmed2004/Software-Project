import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { validateEmail, validatePassword } from '../utils/validation';
import { useFormError } from '../hooks/useFormError';

export function Login({ onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, setError, clearError, clearAllErrors } = useFormError();
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    let isValid = true;

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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllErrors();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          email,
          password,
        });

        console.log('Login successful:', response.data);

        // Redirect to home page on success
        navigate('/home'); // Redirect to /home
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
      <AuthCard title="Sign In">
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
        <AuthButton type="submit">Sign In</AuthButton>
        
        <p className="text-center mt-4">
           Don't have an account?{' '}
           <button type="button" onClick={onSwitchMode} className="link">
            Sign Up
           </button>
        </p>
      </AuthCard>
    </form>
  );
}
