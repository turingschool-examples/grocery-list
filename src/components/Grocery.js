import React from 'react';
import classnames from 'classnames';
import './Grocery.css';

const Grocery = ({ name, quantity, notes, purchased, starred, onPurchase, onStar, onDelete }) => {
  return (
    <article className={classnames('Grocery', { purchased, starred })}>
      <h3>{name}</h3>
      { quantity ? <p>Quantity: {quantity}</p> : null }
      <div className="Grocery-controls">
        <button onClick={onPurchase}>
          { purchased ? 'Unpurchase' : 'Purchase' }
        </button>
        <button onClick={onStar}>
          { starred ? 'Unstar' : 'Star' }
        </button>
        <button onClick={onDelete}>
          Remove
        </button>
      </div>
    </article>
  );
};

export default Grocery;
