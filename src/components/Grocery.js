import React from 'react';
import classnames from 'classnames';
import './Grocery.css';

const Grocery = ({ name, quantity, notes, purchased, starred, onPurchase, onStar, onDelete }) => {
  return (
    <article className={classnames('Grocery', { purchased, starred })}>
      <h3>{name}</h3>
      { quantity && <p className="Grocery-quantity">Quantity: {quantity}</p> }
      { notes && <p className="Grocery-notes">{notes}</p> }
      <div className="Grocery-controls">
        <button className="Grocery-purchase" onClick={onPurchase}>
          { purchased ? 'Unpurchase' : 'Purchase' }
        </button>
        <button className="Grocery-star" onClick={onStar}>
          { starred ? 'Unstar' : 'Star' }
        </button>
        <button className="Grocery-delete" onClick={onDelete}>
          Remove
        </button>
      </div>
    </article>
  );
};

export default Grocery;
