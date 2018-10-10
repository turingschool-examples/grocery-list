import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'

describe('AddGroceryForm', () => {
  describe('handleAddGrocery', () => {
    let mockGrocery
    let mockGroceries
    let mockUpdateGroceryList
    let mockEvent
    let wrapper

    beforeEach(() => {
      mockGrocery = { name: 'fennel', quantity: 4 }
      mockGroceries = [
        { name: 'fennel', quantity: 4 },
        { name: 'pumkins', quantity: 3 }
      ]
      mockUpdateGroceryList = jest.fn()
      mockEvent = { preventDefault: jest.fn() }
      wrapper = shallow(<AddGroceryForm 
                          updateGroceryList={mockUpdateGroceryList}
                        />)

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroceries)
      }))
    })

    it('should call fetch with the correct params', () => {
      // Setup
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

      // Execution
      wrapper.instance().handleAddGrocery(mockEvent)

      // Expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('should reset the form after submit', async () => {
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
      const expected = mockGroceries

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      // Expectation
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(expected)
    })

    it('should set errorStatus if something is caught', async () => {
      // Setup
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Failed to fetch')))
      const expected = 'Failed to fetch'

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      // Expectation
      expect(wrapper.state('errorStatus')).toEqual(expected)
    })
  })
})
