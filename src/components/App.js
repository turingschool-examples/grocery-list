import React from 'react';
import VisibleGroceryList from '../containers/VisibleGroceryList';
import AddGrocery from '../containers/AddGrocery';
import FilterButtonsContainer from '../containers/FilterButtonsContainer';
import './App.css';

const App = () =>  {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
      </header>
      <AddGrocery />
      <VisibleGroceryList />
      <FilterButtonsContainer />
    </div>
  );
};

export default App;
