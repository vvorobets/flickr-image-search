import React from 'react';
import { shallow } from 'enzyme';
import { SearchSubmitInput } from '.';

it('expect to render SearchSubmitInput component', () => {
  expect(shallow(
    <SearchSubmitInput
      name="search-submit-input-test"
      value=""
      onChange={() => {}}
      onSubmit={() => {}}
    />,
  ).length).toEqual(1);
});

it('SearchSubmitInput button handles clicks with provided handler', () => {
  const sampleFn = jest.fn().mockReturnValue();

  const wrapper = shallow(
    <SearchSubmitInput
      name="search-submit-input-test"
      value="123"
      onChange={() => {}}
      onSubmit={sampleFn}
    />,
  );

  const submitButton = wrapper.find('.search-submit-input-button');
  submitButton.simulate('click');

  expect(sampleFn).toHaveBeenCalledTimes(1);
});
