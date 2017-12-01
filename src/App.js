import React, { Component } from 'react';
import './App.css';

import GroceryList from './GroceryList'
import Grocery from './Grocery'
import AddGroceryForm from './AddGroceryForm'
import { fetchGroceries } from './apiCalls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      groceries: [],
      errorStatus: ''
    }

    this.updateGroceryList = this.updateGroceryList.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await fetchGroceries()
      this.setState({groceries: data.groceries})
    } catch(err) {
      this.setState({errorStatus: err.message})
    }
  }

  updateGroceryList(groceries) {
    this.setState({ groceries });
  }

  render() {
    const { errorStatus, groceries } = this.state;

    return (
      <div id="app">
        <AddGroceryForm updateGroceryList={this.updateGroceryList} />
        <h2>Groceries:</h2>
        { errorStatus && <p className="error">{errorStatus}</p> }
        <GroceryList groceries={groceries} />
      </div>
    );
  }
}

export default App;
