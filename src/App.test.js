import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import App from './App';

describe('App', () => {

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('displays an error if there was a problem fetching groceries', async () => {
    fetchMock.get('/api/v1/groceries', { 
      status: 500
    });
    
    const wrapper = mount(<App />);
    await wrapper.update();

    expect(wrapper.state('errorStatus')).toEqual('Error fetching groceries');
    expect(wrapper.find('.error').length).toEqual(1);
  });

});