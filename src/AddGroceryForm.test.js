import React from 'react';
import { shallow } from 'enzyme';
import AddGroceryForm from './AddGroceryForm';

describe('AddGroceryForm', () => {
  let mockEvent;
  let mockGrocery;
  let mockGroceries;
  let mockUpdateGroceryList;
  let wrapper;

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

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(
        { json: () => Promise.resolve(mockGroceries) }
      )
    })
  });

  it('calls fetch with the correct data when adding a new grocery', () => {
    const url = '/api/v1/groceries';
    const options = {
      // set up
      method: 'POST',
      body: JSON.stringify({ grocery: mockGrocery }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    wrapper.setState({ grocery: mockGrocery });

    // execution
    wrapper.instance().handleAddGrocery(mockEvent);

    // expectation
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('resets the state after adding a new grocery', () => {
    const expected = { name: '', quantity: '' };
    wrapper.setState({ grocery: mockGrocery });

    wrapper.instance().handleAddGrocery(mockEvent).then(() => {
      expect(wrapper.state('grocery')).toEqual(expected);
    });
  });

  it('calls the updateGroceryList callback after adding a new grocery', () => {
    wrapper.instance().handleAddGrocery(mockEvent).then(() => {
      expect(mockUpdateGroceryList).toHaveBeenCalledWith(mockGroceries);
    });
  });

  it('sets error in state if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.reject(
        new Error('Fetch failed')
      )
    });

    wrapper.instance().handleAddGrocery(mockEvent).then(() => {
      expect(wrapper.state('errorStatus')).toEqual('Error adding grocery')
    });
  });
})