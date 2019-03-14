import React, { Component } from 'react';
import { addGrocery } from './Api';

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

  async handleAddGrocery(event) {
    event.preventDefault();
    const { updateGroceryList } = this.props;
    const { grocery } = this.state;
    try {
      const groceries = await addGrocery(grocery);
      await this.setState({
        grocery: {
          name: '',
          quantity: '' 
        }
      })
      updateGroceryList(groceries);
    } catch (error) {
      this.setState({
        errorStatus: error.message,
      })
    };
  }

  render() {
    const { grocery } = this.state;
    return (
      <form
        className="AddGroceryForm"
        onSubmit={event => this.handleAddGrocery(event)}
      >
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={grocery.name}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={grocery.quantity}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <input
          type="submit"
          value="Create Item"
          id="submit"
          disabled={!grocery.name}
        />
      </form>
    );
  }
}

export default AddGroceryForm;
