import React from 'react';

import './style.css';

export const SearchInput = ({ name, value, onChange }) => (
  <input
    type="text"
    name={name}
    className="search-input"
    onChange={onChange}
    value={value}
    placeholder="Search name"
  />
);
