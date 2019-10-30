import React, { Component } from 'react';

import { ImageCard } from '../../components';

import './style.css';

export class ImageBoard extends Component {
  render() {
    const { data = [] } = this.props;

    return (
      <div className="image-board">
        {data.map(photo => (
          <ImageCard key={photo.id} data={photo} />
        ))}
      </div>
    )
  }
};
