import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import App from './App';
import AddGroceryForm from './AddGroceryForm';
import GroceryList from './GroceryList';
import Grocery from './Grocery';

describe('App', () => {

  const mockGroceries = [
    { id: 1489863729151, name: 'Pineapples', quantity: 10, purchased: false, starred: false },
    { id: 1489863740047, name: 'Coconuts', quantity: 1000, purchased: false, starred: false },
  ];

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  // it('gets groceries from the server', async (done) => {
  //   fetchMock.get('/api/v1/groceries', { 
  //     status: 200, 
  //     body: { groceries: mockGroceries }
  //   })
    
  //   const wrapper = mount(<App />);
  //   await wrapper.update();

  //   expect(wrapper.state('groceries')).toEqual(mockGroceries);

  // });

  it('displays an error if there was a problem fetching groceries', async () => {
    fetchMock.get('/api/v1/groceries', { 
      status: 500
    })
    
    const wrapper = mount(<App />);
    await wrapper.update();

    expect(wrapper.state('errorStatus')).toEqual('Error fetching groceries');
    expect(wrapper.find('.error').length).toEqual(1);
  });

});