import React, { Component } from 'react'
import axios from 'axios';
export default class CreateReward extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    url: ''
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state);

  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // axios call to api
    axios
      .post('/rewards', {
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        url: this.state.url
      })
      .then(() => {
        // reinitialise state
        this.setState({
          name: '',
          description: '',
          category: '',
          url: ''
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Create a new award</h2>
        <p>Need some ideas for incentives to achieving your goals?</p>
        <p>Check out what <a href="#">other users have added</a> or see if there is something you like on <a href="https://www.developgoodhabits.com/reward-yourself/" target="_blank">this list</a> or <a href="https://organisemyhouse.com/reward-yourself/" target="_blank">this one</a>.</p>
        <br />
        <form onSubmit={this.handleSubmit}>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            placeholder="Give your reward a name"
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={this.state.description}
            placeholder="Add a more detailed description if you need one"
            onChange={this.handleChange} />
          <br />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}>
            <option value="Food">Food</option>
            <option value="Activity/Experience">Activity/Experience</option>
            <option value="" selected="selected">Select a category</option>
            <option value="Gift">Gift</option>
            <option value="Self-care">Self-care</option>
            <option value="Other">Other</option>
          </select>
          <br />

          <label htmlFor="url">Link</label>
          <input
            type="text"
            id="url"
            name="url"
            value={this.state.url}
            placeholder="You can add a link to an internet page here"
            onChange={this.handleChange} />
          <br />

          <button type="submit">Save to my list of rewards</button>
        </form>

      </div >
    )
  }
}
