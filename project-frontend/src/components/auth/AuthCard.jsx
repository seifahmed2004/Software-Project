import React from 'react';

export function AuthCard({ children, title }) {
  return (
    <div className="auth-card">
      <h2 className="auth-card-title">{title}</h2>
      {children}
    </div>
  );
}