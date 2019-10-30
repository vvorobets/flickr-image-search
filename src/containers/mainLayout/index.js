import React, { Component } from 'react';

import { SECOND_GALLERY_ID } from '../../config';

import { ImageBoard } from '../imageBoard';
import {
  SearchInput, SearchSubmitInput, Spinner, ErrorMessage,
} from '../../components';

import './style.css';

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

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

  onChangeText = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  }

  onSearchGallery = () => {
    this.fetchPhotos();
  }

  fetchPhotos = async () => {
    this.setState({ isLoading: true, errorMessage: '' });

    const { galleryId } = this.state;
    const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${galleryId || SECOND_GALLERY_ID}&format=json&nojsoncallback=1`;

    const { stat, photos, message } = await fetch(url).then((res) => res.json());

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
      filteredPhotos = photo.filter((
        { title },
      ) => title
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
        <SearchSubmitInput name="galleryId" value={galleryId} onChange={this.onChangeText('galleryId')} onSubmit={this.onSearchGallery} />
      </div>
    );
  }
}
