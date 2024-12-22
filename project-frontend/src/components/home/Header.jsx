import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ cartIcon }) {
  const navigate = useNavigate();

  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#FFF8EE', borderBottom: '1px solid #ddd' }}>
      <h1 className="text-xl font-semibold">Order something</h1>

      <div className="search-container" style={{ flex: 1, marginLeft: '20px', marginRight: '20px', position: 'relative' }}>
        <div className="search-wrapper" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '20px', height: '20px', marginRight: '5px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 4.5a7 7 0 000 14 7 7 0 000-14z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            style={{ border: 'none', outline: 'none', flex: 1 }}
          />
        </div>
      </div>

      <div className="user-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="cart-icon-wrapper" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '24px', height: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l1.6-8H5.4m0 0L4 9m13 10a2 2 0 11-4 0m6 0a2 2 0 11-4 0" />
          </svg>
          <span style={{ marginLeft: '5px', fontSize: '14px' }}>0</span>
        </div>
        <div
          className="user-info"
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: '24px', height: '24px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9 9 0 1119.88 6.195a9 9 0 01-14.758 11.61zM12 10v2m0 4h.01"
            />
          </svg>
          <span className="ml-2 font-medium" style={{ marginLeft: '8px' }}>Sarah James</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
