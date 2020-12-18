import React, { Component } from 'react';
import './Filter.css';

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

        <div className="filter-item search-filter">
          <input 
            type="text" 
            placeholder="Search..."
            name="searchFilter"
            onChange={this.handleChange}
          />
        </div>

        {/* Category dropdown */}

        <div className="filter-item dropdown-filter">
          <select name="categoryFilter" id="categoryFilter" onChange={ this.handleChange }>
            <option value=''>Category</option>
            { this.props.categories.map(option => {
              return (
                <option>{ option }</option>
              )
            })}
          </select>
        </div>

        {/* Filter favorites */}

        <div className="filter-item checkbox-filter">
          <label htmlFor="favoritesFilter">My Favorites
            <input 
              type="checkbox" 
              id="favoritesFilter" 
              name="favoritesFilter" 
              onChange={this.handleChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    )
  }
}