import React from 'react';
import { shallow } from 'enzyme';

import Grocery from './Grocery';

it('renders the name of the grocery in <h3> tags', () => {
  const wrapper = shallow(<Grocery name="Bananas" />);
  const title = <h3>Bananas</h3>;

  expect(wrapper.contains(title)).toEqual(true);
});

