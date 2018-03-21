import React from 'react'
import { shallow } from 'enzyme'

import AddGroceryForm from './AddGroceryForm'

describe.skip('AddGroceryForm', () => {

  let mockEvent
  let mockGrocery
  let mockUpdateGroceryList
  let wrapper

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() }
    mockGrocery = {
      name: 'apples',
      quantity: 10
    }
    mockUpdateGroceryList = jest.fn()

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([mockGrocery])
    }))

    wrapper = shallow(<AddGroceryForm updateGroceryList={mockUpdateGroceryList} />)
  })

  it('should call fetch with the correct params', () => {
    const expected = [
      '/api/v1/groceries',
      {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ]

    wrapper.setState({ grocery: mockGrocery })
    wrapper.instance().handleAddGrocery(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })

  it('resets the state of grocery', async () => {
    const expected = {
      name: '',
      quantity: ''
    }

    wrapper.setState({ grocery: mockGrocery })

    await wrapper.instance().handleAddGrocery(mockEvent)
    expect(wrapper.state('grocery')).toEqual(expected)
  })

  it('calls the updateGroceryList callback fn with correct params', async () => {

    const expected = [mockGrocery]

    await wrapper.instance().handleAddGrocery(mockEvent)
    expect(mockUpdateGroceryList).toHaveBeenCalledWith(expected)
  })

  it('sets the error state on error', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500,
    }))

    const expected = 'Error adding grocery'

    await wrapper.instance().handleAddGrocery(mockEvent)
    expect(wrapper.state('errorStatus')).toEqual(expected)
  })
})
