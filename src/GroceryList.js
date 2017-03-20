import React from 'react';
import Grocery from './Grocery';

const GroceryList = ({groceries}) => {
  return (
    <div className="GroceryList-groceries">
      {groceries.map(item =>
        <Grocery
          key={item.id}
          {...item}
        />
      )}
    </div>
  );
};

GroceryList.defaultProps = {
  groceries: []
};

export default GroceryList;
