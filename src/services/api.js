import { API_URL, SECOND_GALLERY_ID } from '../config';

require('dotenv').config();

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

export const getPhotos = (galleryId, fetchFn = fetch) => {
  const url = `${API_URL}/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${galleryId || SECOND_GALLERY_ID}&format=json&nojsoncallback=1`;

  return fetchFn(url).then((res) => res.json());
};
