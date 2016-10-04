export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_GROCERY':
      return [...state, Object.assign({}, action.item)];

    case 'PURCHASE_GROCERY':
      return state.map(item => {
        if (item.id !== action.id) { return item; }
        return Object.assign(item, { purchased: !item.purchased });
      });

    case 'STAR_GROCERY':
      return state.map(item => {
        if (item.id !== action.id) { return item; }
        return Object.assign(item, { starred: !item.starred });
      });

    case 'DELETE_GROCERY':
      return state.filter(i => i.id !== action.id);

    case 'CLEAR_GROCERIES':
      return [];

    default:
      return state;
  }
};
