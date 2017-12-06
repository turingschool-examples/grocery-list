import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'

describe('AddGroceryForm', () => {
  const mockEvent = { preventDefault: jest.fn()}
  const mockUpdateGroceryList = jest.fn()
  const mockGrocery = { name: 'Oranges', quantity: 3 }
  const mockGroceries = [
    {id: 1, name: 'Pineapples', quantity: 10},
    {id: 2, name: 'Oranges', quantity: 3}
  ]
  let renderedComponent

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      groceries: mockGroceries,
    })
  }))

  beforeEach(() => {
    renderedComponent = shallow(<AddGroceryForm
                                  updateGroceryList={mockUpdateGroceryList}
                                />)
  })

  it('fetch should receive the correct params when it is called', () => {
    const expectedParams = [
      '/api/v1/groceries',
      {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ]

    renderedComponent.setState({grocery: mockGrocery})
    renderedComponent.instance().handleAddGrocery(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(...expectedParams)
  })

  it('should set state correct after we have digested the fetch', async () => {
    renderedComponent.setState({grocery: mockGrocery})

    await renderedComponent.instance().handleAddGrocery(mockEvent)
    await renderedComponent.update()
    expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
  })

  it('should call our updateGroceryList callback after fetch', async () => {
    renderedComponent.setState({grocery: mockGrocery})

    await renderedComponent.instance().handleAddGrocery(mockEvent)
    await renderedComponent.update()
    expect(mockUpdateGroceryList).toHaveBeenCalledWith({ groceries: mockGroceries})
  })

  it('set the error status if the fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(
      new Error('it failed')
    ))

    await renderedComponent.instance().handleAddGrocery(mockEvent)
    await renderedComponent.update()
    expect(renderedComponent.state('errorStatus')).toEqual('Error adding grocery')
  })
})
