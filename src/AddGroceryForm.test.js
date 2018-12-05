import React from 'react'
import { shallow } from 'enzyme'
import AddGroceryForm from './AddGroceryForm'
import { addGrocery } from './apiCalls.js'

const mockGrocery = { name: 'extra flaming hot cheetos', quantity: 15 }
const mockGroceries = [{ name: 'apple', quantity: 12 }, mockGrocery]

jest.mock('./apiCalls.js', () => ({
  addGrocery: () => mockGroceries
}))

describe('AddGroceryForm', () => {
  describe('handleAddGrocery', () => {
    let mockEvent
    let mockUpdateGroceryList
    let wrapper

    beforeEach(() => {
      mockEvent = { preventDefault: () => {}}
      mockUpdateGroceryList = jest.fn()
      wrapper = shallow(<AddGroceryForm  
        updateGroceryList={mockUpdateGroceryList} />)
    })


    it('should reset the state after its called', async () => {
      // Setup
      const expectedState = {
        grocery: {
          name: '',
          quantity: ''
        },
        errorStatus: ''
      }
      wrapper.setState({ grocery: mockGrocery })

      // Execution && Expectation
      await wrapper.instance().handleAddGrocery(mockEvent)
      expect(wrapper.state()).toEqual(expectedState)
    })

    it('should call updateGroceryList with correct params', async () => {
      // Setup
      const expected = mockGroceries

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      //Expectation
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(expected)
    })

    it.skip('should change the errorStatus if there is an error', async () => {
      // Setup
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Could not fetch'))
      })
      const expectedState = {
        grocery: {
          name: '',
          quantity: '',
        },
        errorStatus: 'Error: Could not fetch'
      }

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent)

      //Expectation
      expect(wrapper.state()).toEqual(expectedState)
    })
  })
})
