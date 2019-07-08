import React from 'react';
import { shallow } from 'enzyme';
import AddGroceryForm from './AddGroceryForm';
import { addGrocery } from './apiCalls';

jest.mock('./apiCalls');

describe('AddGroceryForm', () => {
  let mockEvent;
  let mockGrocery;
  let mockGroceries;
  let mockUpdateGroceryList;
  let wrapper;

  beforeAll(() => {
    addGrocery.mockImplementation(() => mockGroceries);
  })

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
    mockGrocery = { name: 'hot dogs', quantity: 80 }
    mockGroceries = [
      { name: 'buns', quantity: 60 },
      { name: 'ice cream', quantity: 1000 },
      { name: 'hot dogs', quantity: 80 }
    ];
    mockUpdateGroceryList = jest.fn();
    wrapper = shallow(
      <AddGroceryForm updateGroceryList={mockUpdateGroceryList} />
    );
  });

  it('resets the state after adding a new grocery', async () => {
    const expected = { name: '', quantity: '' };
    wrapper.setState({ grocery: mockGrocery });

    await wrapper.instance().handleAddGrocery(mockEvent);

    expect(wrapper.state('grocery')).toEqual(expected);
  });

  it('calls the updateGroceryList callback after adding a new grocery', async () => {
    await wrapper.instance().handleAddGrocery(mockEvent);

    expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
  });

  it('sets error in state if the fetch fails', async () => {
    addGrocery.mockImplementationOnce(() => {
      throw new Error('another error')
    });

    await wrapper.instance().handleAddGrocery(mockEvent)

    expect(wrapper.state('errorStatus')).toEqual('Error adding grocery');
  });
})