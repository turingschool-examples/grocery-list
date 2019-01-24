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
      mockGrocery = { name: 'Oranges', quantity: 5 }
      mockGroceries = [mockGrocery, { name: 'Artichokes', quantity: 2 }]
      wrapper = shallow(
        <AddGroceryForm
          updateGroceryList={ mockUpdateGroceryList }
        />
      )
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockGroceries),
        ok: true,
      }))
    })

    it('should call fetch with the correct params', () => {
      // setup
      const expected = [
        '/api/v1/groceries',
        {
          method: 'POST',
          body: JSON.stringify({ grocery: mockGrocery }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ]
      wrapper.setState({ grocery: mockGrocery })

      // execution
      wrapper.instance().handleAddGrocery(mockEvent)

      // expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    })

    it('should reset the state to the default', () => {
      // setup
      const expectedState = { name: '', quantity: '' }
      wrapper.setState({ grocery: mockGrocery })

      // execution
      wrapper.instance().handleAddGrocery(mockEvent)
        .then(() => {
          // expectation
          expect(wrapper.state('grocery')).toEqual(expectedState)
        })
    })

    it('should call updateGroceryList with the correct params', () => {
      // setup
      const expectedParams = mockGroceries

      // execution
      wrapper.instance().handleAddGrocery(mockEvent)
        .then(() => {
          // expectation
          expect(mockUpdateGroceryList).toHaveBeenCalledWith(expectedParams)
        })
    })

    it('should errorStatus in state if fetch fails', () => {
      // setup
      const expectedError = 'Could not fetch'
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(
        Error('Could not fetch')
      ))

      // execution
      wrapper.instance().handleAddGrocery(mockEvent)
        .then(() => {
          // expectation
          expect(wrapper.state('errorStatus')).toEqual(expectedError)
        })
    })
  })

})
