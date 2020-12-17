import React, { Component } from 'react';
import { login } from '../../services/auth';

export default class SignUp extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password)
    .then(data => {
      if (data.message) {
        this.setState({ 
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        //put the user in the state of App.js
        this.props.setUser(data);
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <>
        <h2>Log In</h2>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={ this.state.username }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
          </div>
          {this.state.message && (
            <p>{ this.state.message }</p>
          )}
          <button type="submit">Log In</button>
        </form>
      </>
    )
  }
}
