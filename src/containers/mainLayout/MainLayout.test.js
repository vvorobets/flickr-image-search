import fetch from 'node-fetch';

import { API_URL, SECOND_GALLERY_ID } from '../../config';
import { getPhotos } from '../../services';

// async test for getPhotos Flickr API method
it('getPhotos fetches photos from Flickr api', (done) => {
  expect.assertions(2);
  getPhotos(null, fetch).then((data) => {
    // this number may change
    expect(data.photos.photo.length).toEqual(13);
    expect(data.stat).toEqual('ok');
    done();
  });
});

it('getPhotos provides an error for wrong gallery id', (done) => {
  expect.assertions(2);
  getPhotos('1', fetch).then((data) => {
    expect(data.photos).toBeUndefined();
    expect(data.stat).toEqual('fail');
    done();
  });
});

it('getPhotos returns count and result', () => {
  const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({
      photos: {
        page: 1,
        pages: 1,
        perpage: 100,
        total: 13,
        photo: [],
      },
      stat: 'ok',
    }),
  }));

  expect.assertions(3);
  return getPhotos(null, mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith(`${API_URL}/services/rest/?method=flickr.galleries.getPhotos&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&gallery_id=${SECOND_GALLERY_ID}&format=json&nojsoncallback=1`);
    expect(data.photos.total).toEqual(13);
  });
});
