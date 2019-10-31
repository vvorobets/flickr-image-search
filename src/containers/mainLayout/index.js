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

  filterPhotos = () => {
    const { data: { photo = [] }, searchKey } = this.state;
    let filteredPhotos = photo;

    // apply search phrase filter if any
    if (searchKey) {
      filteredPhotos = photo.filter(({ title }) => title
        .toLowerCase()
        .includes(searchKey.toLowerCase()));
    }

    return filteredPhotos;
  }

  render() {
    const {
      searchKey,
      galleryId,
      isLoading,
      errorMessage,
    } = this.state;

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
        <ImageBoard data={this.filterPhotos()} />
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
