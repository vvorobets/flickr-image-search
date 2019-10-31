import React from 'react';

import './style.css';

export const SearchSubmitInput = ({
  name, value, onChange, onSubmit,
}) => (
  <>
    <p className="gallery-id-tip">
      You may try few other galleries&apos; ids:
      {' '}
      <span className="gallery-id-badge">5704-72157622637971865</span>
      ,
      <span className="gallery-id-badge">9634-72157621980433950</span>
      ,
      <span className="gallery-id-badge">72157617483228192</span>
      ,
      or something else.
      <br />
      To reset clean input field and push button below
    </p>
    <div className="search-submit-input-container">
      <input
        type="text"
        name={name}
        className="search-submit-input"
        onChange={onChange}
        value={value}
        placeholder="Gallery ID"
      />
      <input
        className="search-submit-input-button"
        type="submit"
        value="&#x1F50D;"
        onClick={onSubmit}
      />
    </div>
  </>
);
