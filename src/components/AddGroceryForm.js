import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGrocery } from '../actions';

import './AddGroceryForm.css';

class AddGrocery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: '',
      notes: ''
    };
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    this.props.dispatch(addGrocery(this.state));
    this.setState({
      name: '',
      quantity: '',
      notes: ''
    });
  }

  render() {
    return (
      <form
        className="AddGroceryForm"
        onSubmit={event => this.handleSubmit(event)}
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
        <label>
          Notes
          <textarea
            name="notes"
            placeholder="Notes"
            value={this.state.notes}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <input
          type="submit"
          value="Create Item"
          disabled={!this.state.name}
        />
      </form>
    );
  }
}

export default connect()(AddGrocery);;
