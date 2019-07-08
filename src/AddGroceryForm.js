import React, { Component } from 'react';

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

  handleAddGrocery(event) {
    event.preventDefault();
    const { updateGroceryList } = this.props;
    const { grocery } = this.state;

    return fetch('/api/v1/groceries', {
      method: 'POST',
      body: JSON.stringify({ grocery }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(groceries => {
      this.setState({
        grocery: {
          name: '',
          quantity: ''
        }
      }, updateGroceryList(groceries));
    })
    .catch(error => {
      this.setState({
        errorStatus: 'Error adding grocery'
      })
    });
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
