import React, { Component } from 'react';
import classnames from 'classnames';
import './Grocery.css';


const Grocery = ({ name, quantity, purchased, starred }) => {
  return (
    <article className={classnames('Grocery', { purchased, starred })}>
      <h3>{name}</h3>
      { quantity && <p className="Grocery-quantity">Quantity: {quantity}</p> }
      <div className="Grocery-controls">
        <button className="Grocery-purchase">
          { purchased ? 'Unpurchase' : 'Purchase' }
        </button>
        <button className="Grocery-star">
          { starred ? 'Unstar' : 'Star' }
        </button>
        <button className="Grocery-delete">
          Remove
        </button>
      </div>
    </article>
  );
};

export default Grocery;
