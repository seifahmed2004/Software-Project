import React from 'react';

export function AuthButton({ children, ...props }) {
  return (
    <button {...props} className="btn btn-primary">
      {children}
    </button>
  );
}