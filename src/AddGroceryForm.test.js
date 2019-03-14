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
    let mockUpdateGroceryList;
    let wrapper;

    beforeEach(() => {
      mockGrocery = { name: 'pizza', quantity: 20 };
      mockGroceries = [
        { name: 'pies', quanity: 50 },
        { name: 'burritos', quantity: '100'},
      ]; 

      addGrocery.mockImplementation(() => Promise.resolve(mockGroceries));
      mockEvent = { preventDefault: jest.fn() };
      mockUpdateGroceryList = jest.fn();
      wrapper = shallow(<AddGroceryForm 
        updateGroceryList={mockUpdateGroceryList}
      />);
    });

    it('resets state after a successful fetch', async () => {
      wrapper.setState({ grocery: mockGrocery });
      await wrapper.instance().handleAddGrocery(mockEvent);
      expect(wrapper.state('grocery')).toEqual({ name: '', quantity: '' });
    });

    it('calls the updateGroceryList callback after a successful fetch', async () => {
      await wrapper.instance().handleAddGrocery(mockEvent);
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
    });

    it('sets an error status when fetch does not work properly', async () => {
      addGrocery.mockImplementationOnce(() => Promise.reject(
        new Error('Fetch failed')
      ));
      await wrapper.instance().handleAddGrocery(mockEvent);
      expect(wrapper.state('errorStatus')).toBe('Fetch failed');
    });
  });
});
