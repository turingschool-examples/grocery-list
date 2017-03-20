import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import AddGroceryForm from './AddGroceryForm';

describe('AddGroceryForm', () => {

  const mockGroceries = [
    { id: 1489863729151, name: 'Pineapples', quantity: 10, purchased: false, starred: false },
    { id: 1489863740047, name: 'Coconuts', quantity: 1000, purchased: false, starred: false },
    { id: 1489863740347, name: 'Pears', quantity: 5, purchased: false, starred: false },
  ];

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('submits the correct data when adding a new grocery', () => {
    fetchMock.post('/api/v1/groceries', { 
      status: 200,
      body: mockGroceries
    });
    
    const wrapper = mount(<AddGroceryForm updateGroceryList={jest.fn()} />);

    const nameInput = wrapper.find('input[name="name"]');
    const qtyInput = wrapper.find('input[name="quantity"]');
    const formElem = wrapper.find('form');

    nameInput.simulate('change', {
      target: { name: 'name', value: 'Foo' }
    });

    qtyInput.simulate('change', {
      target: { name: 'quantity', value: '1000' }
    });

    formElem.simulate('submit');

    expect(fetchMock.called()).toEqual(true);
    expect(fetchMock.lastUrl()).toEqual('/api/v1/groceries');
    expect(fetchMock.lastOptions()).toEqual({
      method: 'POST',
      body: '{"grocery":{"name":"Foo","quantity":"1000"}}',
      headers: { 'Content-Type': 'application/json' }
    });
  });

});