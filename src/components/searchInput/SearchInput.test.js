import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from '.';

it('expect to render SearchInput component', () => {
  expect(shallow(<SearchInput name="search-input-test" value="" onChange={() => {}} />).length).toEqual(1);
});

it('SearchInput component handles input', () => {
  const sampleFn = jest.fn().mockReturnValue();

  const wrapper = shallow(
    <SearchInput
      name="search-submit-input-test"
      value="D"
      onChange={sampleFn}
    />,
  );

  const submitButton = wrapper.find('.search-input');
  // event or synthetic event in reality
  submitButton.simulate('change', 'DE');

  expect(sampleFn).toHaveBeenCalledWith('DE');
});

