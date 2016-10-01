const defaultProperties = {
  starred: false,
  purchased: false
};

export const addGrocery = (item) => {
  return {
    type: 'ADD_GROCERY',
    item: Object.assign(defaultProperties, { id: item.name }, item)
  }
};

export const purchaseGrocery = (id) => ({ type: 'PURCHASE_GROCERY', id });

export const starGrocery = (id) => ({ type: 'STAR_GROCERY', id });

export const deleteGrocery = (id) => ({ type: 'DELETE_GROCERY', id });

export const clearGroceries = () => ({ type: 'CLEAR_GROCERIES' });

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
};
