import React from 'react';
import { shallow } from 'enzyme';
import { ImageCard } from '.';

it('expect to render ImageCard component', () => {
  const sampleData = {
    title: 'A', farm: 123, server: 456, id: 15, secret: '123fgh',
  };
  expect(shallow(<ImageCard data={sampleData} />).length).toEqual(1);
});

it('ImageCard component handles its own width', () => {
  expect.assertions(2);
  const sampleWidth = 300;
  const sampleData = {
    title: 'A', farm: 123, server: 456, id: 15, secret: '123fgh',
  };
  const { farm, server, id, secret } = sampleData;

  const wrapper = shallow(<ImageCard data={sampleData} />);

  const picture = wrapper.find('.image-card-picture');
  picture.simulate('load', { target: { offsetWidth: sampleWidth } });

  const titleStyle = wrapper.find('.image-card-title').prop('style');
  expect(titleStyle).toHaveProperty('width', sampleWidth - 16);
  expect(picture.prop('src')).toBe(`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`);
});
