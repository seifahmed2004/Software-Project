import React from 'react';

export function AuthInput({ label, error, ...props }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
      </label>
      <input
        {...props}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}