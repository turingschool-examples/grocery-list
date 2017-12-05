import React, { Component } from 'react';

import { addGrocery } from './apiCalls';
import './AddGroceryForm.css';

class AddGroceryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grocery: {
        name: '',
        quantity: '' 
      },
      errorStatus: ''
    };
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({ 
      grocery: Object.assign(this.state.grocery, {
        [name]: value
      })
    });
  }

  async addGrocery(event) {
    event.preventDefault();
    const { updateGroceryList } = this.props;
    const grocery = this.state.grocery;

    try {
      const data = await addGrocery(grocery)
      this.setState({
        grocery: {
          name: '',
          quantity: '' 
        }
      }, updateGroceryList(data.groceries));
    } catch(error) {
      this.setState({
        errorStatus: 'Error adding grocery'
      })
    };
  }

  render() {
    return (
      <form
        className="AddGroceryForm"
        onSubmit={event => this.addGrocery(event)}
      >
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <input
          type="submit"
          value="Create Item"
          id="submit"
          disabled={!this.state.grocery.name}
        />
      </form>
    );
  }
}

export default AddGroceryForm;
