import React, { Component } from 'react';
import './Filter.css';
import {Link} from 'react-router-dom';

export default class Filter extends Component {

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.props.setFilter(name, value)
  }

  render() {

    return (
      <div className="filter-bar">
        {/* Search field */}
        <div className="filter">
          <input 
            type="text" 
            placeholder="Search..."
            name="searchFilter"
            onChange={this.handleChange}
          />
        </div>
        {/* Category dropdown */}
        <div className="filter">
          <label htmlFor="categoryFilter">Category</label>
          <select name="categoryFilter" id="categoryFilter" onChange={ this.handleChange }>
            <option value=''>All</option>
            { this.props.categories.map(option => {
              return (
                <option>{ option }</option>
              )
            })}
          </select>
        </div>
        {/* Filter favorites */}
        <div className="filter">
          <input 
            type="checkbox" 
            id="favoritesFilter" 
            name="favoritesFilter" 
            onChange={this.handleChange}
          />
          <label htmlFor="favoritesFilter">My Favorites</label>
        </div>
      </div>
    )
  }
}