import React from 'react';
import classNames from 'classnames';
import './FilterButtons.css';

const FilterButtons = ({ filter, onVisibilityChange }) => {
  return (
    <section className="FilterButtons">
      <p className="FilterButtons-filter">{filter}</p>
      <button
        onClick={() => onVisibilityChange('SHOW_ALL')}
        className={classNames({ active: filter === 'SHOW_ALL' })}
      >
        Show All
      </button>
      <button
        onClick={() => onVisibilityChange('SHOW_PURCHASED')}
        className={classNames({ active: filter === 'SHOW_PURCHASED' })}
      >
        Show Purchased
      </button>
      <button
        onClick={() => onVisibilityChange('SHOW_UNPURCHASED')}
        className={classNames({ active: filter === 'SHOW_UNPURCHASED' })}
      >
        Show Unpurchased
      </button>
      <button
        onClick={() => onVisibilityChange('SHOW_STARRED')}
        className={classNames({ active: filter === 'SHOW_STARRED' })}
      >
        Show Starred
      </button>
    </section>
  );
};

export default FilterButtons;
