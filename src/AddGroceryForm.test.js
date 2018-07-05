import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'

describe('AddGroceryForm', () => {

  describe('handleAddGrocery', () => {

    let mockEvent
    let mockUpdateGroceryList
    let mockGrocery
    let mockGroceries
    let wrapper

    beforeEach(() => {
      mockEvent = { preventDefault: jest.fn() }
      mockUpdateGroceryList = jest.fn()
      mockGrocery = { name: 'apples', quantity: 10 }
      mockGroceries = [ mockGrocery, { name: 'oranges', quantity: 4 } ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockGroceries)
      }))

      wrapper = shallow(<AddGroceryForm  
                          updateGroceryList={mockUpdateGroceryList} />)
    })

    it('should call fetch with the correct params', () => {
      // Setup
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
      wrapper.setState({ grocery: mockGrocery })

      // Execution
      wrapper.instance().handleAddGrocery(mockEvent)

      // Expection
      expect(window.fetch).toHaveBeenCalledWith(...expectedParams)
    })

    it('should reset the state of the form after being called', async () => {
      // Setup
      const expected = { name: '', quantity: '' }
      wrapper.setState({ grocery: mockGrocery })

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)
      
      // Expectation
      expect(wrapper.state('grocery')).toEqual(expected)
    })

    it('should call updateGroceryList with the correct params', async () => {
      // Setup
      const expectedParams = mockGroceries

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      // Expectation
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(expectedParams)
    })

    it('should update state with an error, if an error occurs', async () => {
      // Setup
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('shit is wrong')))
      const expected = 'shit is wrong'

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      // Expectation
      expect(wrapper.state('errorStatus')).toEqual(expected)
    })
  })

})
