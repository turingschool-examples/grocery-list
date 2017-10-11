import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App.js';
import AddGroceryForm from './AddGroceryForm.js';
import fetchMock from 'fetch-mock';

describe('App', () => {

  const mockData = {
    groceries: [
      { id: 1489863729151, name: 'Pizza', quantity: 10, purchased: false, starred: false },
      { id: 1489863740047, name: 'Steak', quantity: 1000, purchased: false, starred: false },
      { id: 1489863740048, name: 'Toaster Strudel', quantity: 10000, purchased: false, starred: false }
    ]
  }

  const pause = () => {
    return new Promise(res => {
      setTimeout(() => {
        res()
      })
    })
  }

  it('Sets state with data after component mounts', async () => {
    fetchMock.get('/api/v1/groceries', {
      status: 200,
      body: mockData
    })

    const wrapper = mount(<App />)

    await pause()

    console.log(wrapper.debug())
    const groceriesOnDOM = wrapper.find('Grocery')

    expect(wrapper.state().groceries).toEqual(mockData.groceries)
    expect(groceriesOnDOM.length).toEqual(3)
  })

  it('submits the correct data when adding a new grocery', async () => {
  fetchMock.post('/api/v1/groceries', {
    status: 200,
    body: mockData
  });

  const mockFn = jest.fn()

  const wrapper = mount(<AddGroceryForm updateGroceryList={ mockFn } />)

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

  await pause()

  expect(mockFn).toHaveBeenCalledTimes(1)
});






})
