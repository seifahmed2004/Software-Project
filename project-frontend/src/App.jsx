import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Login } from './pages/Login';
import { SignUp } from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import CartPage from './pages/CartPage';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:8000/api/sample/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleAuthMode = (navigate) => {
    setIsLogin((prev) => {
      const nextMode = !prev;
      navigate(nextMode ? '/login' : '/signup'); 
      return nextMode;
    });
  };

  return (
    <Router>
      <div className="auth-container">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLogin ? "/login" : "/signup"} replace />}
          />
          <Route
            path="/login"
            element={<WithNavigation Component={Login} onSwitchMode={toggleAuthMode} />}
          />
          <Route
            path="/signup"
            element={<WithNavigation Component={SignUp} onSwitchMode={toggleAuthMode} />}
          />
          <Route path="/home" element={<Home message={message} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

function WithNavigation({ Component, onSwitchMode }) {
  const navigate = useNavigate();
  return <Component onSwitchMode={() => onSwitchMode(navigate)} />;
}
