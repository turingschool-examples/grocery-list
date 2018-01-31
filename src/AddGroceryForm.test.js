import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'

describe.skip('AddGroceryForm', () => {
  let mockGrocery
  let mockGroceries
  let mockUpdateGroceryList
  let mockEvent
  let renderedComponent

  beforeAll(() => {
    mockGrocery = {
      name: 'Beef Jerky',
      quantity: 100
    }

    mockGroceries = [
      {name: 'Queso', quantity: 1000},
      {name: 'Beef Jerky', quantity: 100}
    ]

    mockUpdateGroceryList = jest.fn()

    mockEvent = { preventDefault: jest.fn() }

  })

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        groceries: mockGroceries,
      })
    }))

    renderedComponent = shallow(<AddGroceryForm 
                                  updateGroceryList={mockUpdateGroceryList}
                                />)
  })

  it('calls fetch with the correct params', () => {
    const expectParams = [
      '/api/v1/groceries',
      {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ]

    renderedComponent.setState({grocery: mockGrocery})
    renderedComponent.instance().handleAddGrocery(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(...expectParams)
  })

  it('resets the state after adding a new grocery', async () => {
    renderedComponent.setState({ grocery: mockGrocery })

    await renderedComponent.instance().handleAddGrocery(mockEvent)
    await renderedComponent.update()
    expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
  })

  it('calls the updateGroceryList callback after adding a new grocery', async () => {
    await renderedComponent.instance().handleAddGrocery(mockEvent)
    expect(mockUpdateGroceryList).toHaveBeenCalled()
  })

  it('updates the errorStatus in the event of an error', async () => {
    window.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
      reject(new Error('opps!'))
    }))

    await renderedComponent.instance().handleAddGrocery(mockEvent)
    expect(renderedComponent.state('errorStatus')).toEqual('Error adding grocery')
  })
})
