import React from 'react';
import { shallow } from 'enzyme';
import AddGroceryForm from './AddGroceryForm';
import { addGrocery } from './apiCalls';
jest.mock('./apiCalls');


describe('AddGroceryForm', () => {
  let mockEvent;
  let mockUpdateGroceryList;
  let mockGrocery;
  let mockGroceries;
  let component;
  
  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
    mockUpdateGroceryList = jest.fn();
    mockGrocery = { name: 'oranges', quantity: 3 };
    mockGroceries = [
      { id: 1, name: 'turkey', quantity: 1 },
      { id: 2, name: 'oranges', quantity: 3 },
    ];

    component = shallow(
      < AddGroceryForm 
        updateGroceryList={mockUpdateGroceryList}
      />
    );

    addGrocery.mockImplementation(() => mockGroceries);
  });

  it('resets state after adding a new grocery', async () => {
    component.setState({grocery: mockGrocery});
    await component.instance().handleAddGrocery(mockEvent)
    expect(component.state('grocery')).toEqual({name: '', quantity: ''});
  });

  it('calls updateGroceryList after adding a new grocery', async () => {
    await component.instance().handleAddGrocery(mockEvent)
    expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
  });

  it('sets an error when the fetch fails', async () => {
    addGrocery.mockImplementationOnce(() => {
      throw new Error('Error adding grocery')
    });

    await component.instance().handleAddGrocery(mockEvent)
    expect(component.state('error')).toEqual('Error adding grocery')
  });
});
