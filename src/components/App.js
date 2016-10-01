import React from 'react';
import VisibleGroceryList from '../containers/VisibleGroceryList';
import AddGroceryForm from './AddGroceryForm';
import './App.css';

const App = () =>  {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
      </header>
      <AddGroceryForm/>
      <VisibleGroceryList />
    </div>
  );
};

export default App;
