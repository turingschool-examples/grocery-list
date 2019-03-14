import React from 'react';
import { shallow } from 'enzyme';
import AddGroceryForm from './AddGroceryForm';

describe('AddGroceryForm', () => {
  describe('handleAddGrocery', () => {
    let mockEvent;
    let mockGrocery;
    let mockGroceries;
    let wrapper;
    let mockUpdateGroceryList;

    beforeEach(() => {
      mockEvent = { preventDefault: jest.fn() };
      mockGrocery = { name: 'Pizzas', quantity: '10' };
      mockGroceries = [
        { name: 'burritos', quantity: '20' },
        { name: 'carrots', quantity: '15' },
      ];
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockGroceries),
      }));
      mockUpdateGroceryList = jest.fn();
      wrapper = shallow(<AddGroceryForm 
        updateGroceryList={mockUpdateGroceryList}
      />);
    });

    it('calls fetch with the correct url and options', () => {
      // setup
      const expectedUrl = '/api/v1/groceries';
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({ grocery: mockGrocery }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // execution
      wrapper.setState({ grocery: mockGrocery });
      wrapper.instance().handleAddGrocery(mockEvent);

      // expectation
      expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('resets state on a successful request', () => {
      // setup
      const expectedState = { name: '', quantity: '' };

      // execution
      wrapper.setState({ grocery: mockGrocery });
      wrapper.instance().handleAddGrocery(mockEvent).then(() => {
        // expectation
        expect(wrapper.state('grocery')).toEqual(expectedState);
      });
    });

    it('calls the updateGroceryList callback with the right params', () => {
      // execution
      wrapper.instance().handleAddGrocery(mockEvent).then(() => {
        //expectation
        expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
      });
    });

    it('sets an error if fetch fails', () => {
      // setup 
      fetch = jest.fn().mockImplementationOnce(() => Promise.reject(
        new Error('The fetch failed.')
      ));

      // exectution 
      wrapper.instance().handleAddGrocery(mockEvent).then(() => {
        // expectation
        expect(wrapper.state('errorStatus')).toBe('The fetch failed.');
      });
    });
  });
});
