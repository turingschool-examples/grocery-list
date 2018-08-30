import React from 'react';
import { shallow } from 'enzyme';

import AddGroceryForm from './AddGroceryForm';

describe('AddGroceryForm', () => {
  describe('handleAddGrocery method', () => {
    let mockEvent;
    let mockGrocery;
    let mockUpdateGroceryList;
    let mockGroceries;
    let wrapper;

    beforeEach(() => {
      mockEvent = { preventDefault: jest.fn() };
      mockGrocery = { name: 'bananas', quantity: 3 };
      mockUpdateGroceryList = jest.fn();
      mockGroceries = [
        { name: 'bananas', quantity: 3 },
        { name: 'apples', quantity: 2 }
      ];
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockGroceries)
        })
      );
      wrapper = shallow(
        <AddGroceryForm updateGroceryList={mockUpdateGroceryList} />
      );
    });

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
      ];
      wrapper.setState({ grocery: mockGrocery });

      // Execution
      wrapper.instance().handleAddGrocery(mockEvent);

      // Expectation
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should set the reset the state of the form to its inital value', async () => {
      // Setup
      wrapper.setState({ grocery: mockGrocery });
      const expected = { name: '', quantity: '' };

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent);

      // Expectation
      expect(wrapper.state('grocery')).toEqual(expected);
    });

    it('should call updateGroceryList prop with the correct params', async () => {
      // Setup
      const expected = mockGroceries;

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent);

      // Expectation
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(expected);
    });

    it('should update state with errorStatus if something goes wrong', async () => {
      // Setup
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error('failed')));

      // Execution
      await wrapper.instance().handleAddGrocery(mockEvent);

      // Expectation
      expect(wrapper.state('errorStatus')).toEqual('failed');
    });
  });
});
