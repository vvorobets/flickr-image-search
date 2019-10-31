import React, { Component } from 'react';
import { getPhotos } from '../../services';

import { ImageBoard } from '../imageBoard';
import {
  SearchInput, SearchSubmitInput, Spinner, ErrorMessage,
} from '../../components';

import './style.css';

export class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},

      searchKey: '',
      galleryId: '',

      isLoading: false,
      // errCode: null,
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  onChangeText = (key) => (e) => this.setState({ [key]: e.target.value });

  fetchPhotos = async () => {
    this.setState({ isLoading: true, errorMessage: '' });

    const { galleryId } = this.state;
    const { stat, photos, message } = await getPhotos(galleryId);

    if (stat === 'ok') {
      this.setState({ data: photos, isLoading: false });
    } else if (stat === 'fail') {
      this.setState({
        data: {}, isLoading: false, errorMessage: message,
      });
    }
  }

  render() {
    const {
      data: { photo },
      searchKey,
      galleryId,
      isLoading,
      errorMessage,
    } = this.state;

    // apply search phrase filter if any
    let filteredPhotos = photo;
    if (searchKey) {
      filteredPhotos = photo.filter(({ title }) => title
        .toLowerCase()
        .includes(searchKey.toLowerCase()));
    }

    return (
      <div className="container">
        {isLoading && <Spinner />}
        <header className="container-header">
          <a className="main-link" href="https://www.flickr.com" target="_blank" rel="noopener noreferrer">
            Flickr.com
          </a>
          {' '}
          Image Observer
        </header>
        <SearchInput name="searchKey" value={searchKey} onChange={this.onChangeText('searchKey')} />
        {!!errorMessage && <ErrorMessage message={errorMessage} />}
        <ImageBoard data={filteredPhotos} />
        <SearchSubmitInput
          name="galleryId"
          value={galleryId}
          onChange={this.onChangeText('galleryId')}
          onSubmit={this.fetchPhotos}
        />
      </div>
    );
  }
}
