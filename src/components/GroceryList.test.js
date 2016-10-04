import React from 'react';
import { shallow, mount } from 'enzyme';

import GroceryList from './GroceryList';

it('has the correct number of groceries', () => {
  const wrapper = shallow(
    <GroceryList
      groceries={[
        { id: 1, name: 'Bananas' },
        { id: 2, name: 'Apples' },
        { id: 3, name: 'Circle Cheeses' }
      ]}
    />
  );

  expect(wrapper.find('Grocery').length).toEqual(3);
});

describe('Clear Groceries', () => {

  it('has a button.Groceries-clear button which is disabled with no groceries', () => {
    const wrapper = shallow(
      <GroceryList
        groceries={[]}
      />
    );

    expect(wrapper.find('.GroceryList-clear').prop('disabled')).toBe(true);
  });

  it('has a button.Groceries-clear button which is enable when there are groceries', () => {
    const wrapper = shallow(
      <GroceryList
        groceries={[
          { id: 1, name: 'Bananas' },
          { id: 2, name: 'Apples' },
          { id: 3, name: 'Circle Cheeses' }
        ]}
      />
    );

    expect(wrapper.find('.GroceryList-clear').prop('disabled')).toBe(false);
  });

  it('triggers onClearGroceries when clicked', () => {
    const onClearGroceriesMock = jest.fn();

    const wrapper = mount(
      <GroceryList
        groceries={[
          { id: 1, name: 'Bananas' },
          { id: 2, name: 'Apples' },
          { id: 3, name: 'Circle Cheeses' }
        ]}
        onClearGroceries={onClearGroceriesMock}
      />
    );

    wrapper.find('.GroceryList-clear').simulate('click');

    expect(onClearGroceriesMock).toBeCalled();
  });

});
