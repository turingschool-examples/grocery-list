import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders the name of the application', () => {
  const wrapper = shallow(<App />);
  const title = <h1>Grocery List</h1>;
  expect(wrapper.contains(title)).toEqual(true);
});
