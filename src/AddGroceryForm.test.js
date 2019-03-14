import React from 'react';
import { shallow } from 'enzyme';
import AddGroceryForm from './AddGroceryForm';
import { addGrocery } from './Api';
jest.mock('./Api');

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
      mockUpdateGroceryList = jest.fn();
      wrapper = shallow(<AddGroceryForm 
        updateGroceryList={mockUpdateGroceryList}
      />);
      addGrocery.mockImplementation(() => mockGroceries);
    });

    it('resets state on a successful request', async () => {
      // setup
      const expectedState = { name: '', quantity: '' };

      // execution
      wrapper.setState({ grocery: mockGrocery });
      await wrapper.instance().handleAddGrocery(mockEvent);

      // expectation
      expect(wrapper.state('grocery')).toEqual(expectedState);
    });

    it('calls the updateGroceryList callback with the right params', async () => {
      // execution
      await wrapper.instance().handleAddGrocery(mockEvent);
      //expectation
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
    });

    it('sets an error if fetch fails', async () => {
      // setup 
      addGrocery.mockImplementationOnce(() => {
        throw new Error('Status 404 returned from the server.');
      });

      // exectution 
      await wrapper.instance().handleAddGrocery(mockEvent);
      // expectation
      expect(wrapper.state('errorStatus')).toBe('Status 404 returned from the server.');
    });
  });
});
