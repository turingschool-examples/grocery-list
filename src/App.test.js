import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App.js';
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

    console.log('state in test ', wrapper.state())
    expect(wrapper.state().groceries).toEqual(mockData.groceries)
    // expect(wrapper.state().groceries).toEqual('pizza')
  })



})
