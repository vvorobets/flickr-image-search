import React from 'react';

import './style.css';

export const ErrorMessage = ({ message }) => (
  <div className="error-message">
    {`! ${message || 'Error'}`}
  </div>
);
