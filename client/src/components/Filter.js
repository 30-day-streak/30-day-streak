import React, { Component } from 'react';
import axios from 'axios';

export default class Filter extends Component {

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.props.setFilter(name, value)
  }

  render() {

    return (
      <div>
      {/* Search field */}
        <input 
          type="text" 
          placeholder="Search..."
          name="search"
          onChange={this.handleChange}
        />
      {/* Category dropdown */}
        <label htmlFor="category">Category</label>
        <select name="category" id="category" onChange={ this.handleChange }>
          <option value=''>All</option>

          { this.props.categories.map(option => {
            return (
              <option>{ option }</option>
            )
          })}
        </select>
      {/* Filter favorites */}
        <input 
          type="checkbox" 
          id="favorites" 
          name="favorites" 
          // value={this.state.favorite}
          onChange={this.handleChange}
        />
        <label htmlFor="favorites">My Favorites</label>
      </div>
    )
  }
}
