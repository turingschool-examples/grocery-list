import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import AddGroceryForm from '../AddGroceryForm';
import App from '../App';

const pause = () => {
  return new Promise(res =>
    setTimeout(() => {
      res()
    })
  )
}

describe('AddGroceryForm Component', () => {


  const mockGroceries = [
    { id: 1, name: 'Pineapples', quantity: 12 },
    { id: 2, name: 'Coconuts', quantity: 1000 },
    { id: 3, name: 'Pears', quantity: 5 }
  ];

  const getGroceries = {
    groceries: mockGroceries
  }


// this test does NOT pass with await mount(), or await wrapper.update() or fetchMock.flush()

  it('should intercept on componentDidMount',  async () => {
    fetchMock.get("/api/v1/groceries", {
      status: 200,
      body: getGroceries
    })

    const wrapper = await mount(<App />)

    console.log('state after', wrapper.state().groceries)
    expect(wrapper.state().groceries).toEqual(mockGroceries)
  })


// This test passes with the await pause()

  it('should intercept on componentDidMount',  async () => {
    fetchMock.get("/api/v1/groceries", {
      status: 200,
      body: getGroceries
    })

    const wrapper = mount(<App />)
    await pause()

    console.log('state ', wrapper.state().groceries)
    expect(wrapper.state().groceries).toEqual(mockGroceries)
  })

// this test passes with await pause()
  it('submits the correct data when adding a new grocery', async () => {
    fetchMock.post('/api/v1/groceries', {
      status: 200,
      body: mockGroceries
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
