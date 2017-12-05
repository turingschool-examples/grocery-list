import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'

jest.mock('./apiCalls')

describe('AddGroceryForm', () => {
  const mockGrocery = { name: 'Oranges', quantity: 3 }
  const mockUpdateGroceryList = jest.fn()
  const mockEvent = { preventDefault: jest.fn() }
  let renderedComponent

  beforeEach(() => { 
    renderedComponent = shallow(<AddGroceryForm 
                                  updateGroceryList={mockUpdateGroceryList}
                                />)
  })

  it('resets the state after adding a new grocery', async () => {
    renderedComponent.setState({grocery: mockGrocery})
    await renderedComponent.instance().addGrocery(mockEvent)
    expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
  })

  it('calls the updateGroceryList callback after adding a new grocery', async () => {
    await renderedComponent.instance().addGrocery(mockEvent)
    expect(mockUpdateGroceryList).toHaveBeenCalled()
  })

  it('sets an error when the fetch fails', async () => {
    await renderedComponent.instance().addGrocery(mockEvent)
    expect(renderedComponent.state('errorStatus')).toEqual('Error adding grocery')
  })

})

//describe('AddGroceryForm', () => {
//  const mockGrocery = { name: 'Oranges', quantity: 3 }
//
//  const mockGroceries = [
//    {id: 1, name: 'Pineapples', quantity: 10},
//    {id: 2, name: 'Oranges', quantity: 3}
//  ]
//
//  const mockEvent = { preventDefault: jest.fn() }
//
//  const mockUpdateGroceryList = jest.fn()
//
//  window.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
//    resolve({
//      json: () => new Promise((resolve, reject) => {
//        resolve(mockGroceries)
//      })
//    })
//  }))
//
//  // Same syntax using async/await
//  it('calls fetch with the correct data when adding a new grocery', () => {
//    const expectedFetchBody = {
//      method: 'POST',
//      body: JSON.stringify({ grocery: mockGrocery }),
//      headers: {
//        'Content-Type': 'application/json'
//      }
//    }
//
//    const renderedComponent = shallow(<AddGroceryForm 
//                                      updateGroceryList={mockUpdateGroceryList}
//                                    />)
//
//    renderedComponent.setState({grocery: mockGrocery})
//
//    renderedComponent.instance().addGrocery(mockEvent)
//    expect(window.fetch).toHaveBeenCalledWith('/api/v1/groceries', expectedFetchBody)
//  })
//
//  //it('resets the state after adding a new grocery', () => {
//  //  const renderedComponent = shallow(<AddGroceryForm 
//  //                                    updateGroceryList={mockUpdateGroceryList}
//  //                                  />)
//
//  //  renderedComponent.setState({grocery: mockGrocery})
//
//  //  new Promise((resolve) => {
//  //    resolve(renderedComponent.instance().addGrocery(mockEvent))
//  //  }).then(() => {
//  //    renderedComponent.update()
//  //  }).then(() => {
//  //    expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
//  //  })
//  //})
//
//  it('resets the state after adding a new grocery', async () => {
//    const renderedComponent = shallow(<AddGroceryForm 
//                                      updateGroceryList={mockUpdateGroceryList}
//                                    />)
//
//    renderedComponent.setState({grocery: mockGrocery})
//
//    await renderedComponent.instance().addGrocery(mockEvent)
//    await renderedComponent.update()
//    expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
//  })
//
//  //it('calls the updateGroceryList callback after adding a new grocery', () => {
//  //  const renderedComponent = shallow(<AddGroceryForm 
//  //                                    updateGroceryList={mockUpdateGroceryList}
//  //                                  />)
//
//  //  new Promise((resolve) => {
//  //    resolve(renderedComponent.instance().addGrocery(mockEvent))
//  //  }).then(() => {
//  //    expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries)
//  //  })
//  //})
//
//  it('calls the updateGroceryList callback after adding a new grocery', async () => {
//    const renderedComponent = shallow(<AddGroceryForm 
//                                      updateGroceryList={mockUpdateGroceryList}
//                                    />)
//
//    await renderedComponent.instance().addGrocery(mockEvent)
//    expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries)
//  })
//
//  //it('sets an error when the fetch fails', () => {
//  //  window.fetch = jest.fn().mockImplementationOnce(() => new Promise((resolve, reject) => {
//  //    reject(new Error('failed'))
//  //  }))
//
//  //  const renderedComponent = shallow(<AddGroceryForm 
//  //                                    updateGroceryList={mockUpdateGroceryList}
//  //                                  />)
//
//  //  new Promise((resolve) => {
//  //    resolve(renderedComponent.instance().addGrocery(mockEvent))
//  //  }).then(() => {
//  //    renderedComponent.update()
//  //  }).then(() => {
//  //    renderedComponent.update()
//  //  }).then(() => {
//  //    expect(renderedComponent.state('errorStatus')).toEqual('Error adding grocery')
//  //  })
//  //})
//
//  it('sets an error when the fetch fails', async () => {
//    window.fetch = jest.fn().mockImplementationOnce(() => new Promise((resolve, reject) => {
//      reject(new Error('failed'))
//    }))
//
//    const renderedComponent = shallow(<AddGroceryForm 
//                                      updateGroceryList={mockUpdateGroceryList}
//                                    />)
//
//    await renderedComponent.instance().addGrocery(mockEvent)
//    await renderedComponent.update()
//    await renderedComponent.update()
//    expect(renderedComponent.state('errorStatus')).toEqual('Error adding grocery')
//  })
//
//})
