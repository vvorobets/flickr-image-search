import React, { useState } from 'react';

import './style.css';

export const ImageCard = ({
  data: {
    title, farm, server, id, secret,
  },
}) => {
  const [width, setWidth] = useState(0);
  const onImageLoad = ({ target }) => {
    console.log('IMG', target.offsetWidth)
    setWidth(target.offsetWidth);
  };

  return (
    <div className="image-card">
      <img
        className="image-card-picture"
        src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
        alt={title}
        onLoad={onImageLoad}
      />
      <p className="image-card-title" style={{ width: width - 16 }}>{title}</p>
    </div>
  );
};
