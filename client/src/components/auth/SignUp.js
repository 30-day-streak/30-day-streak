import React, { Component } from 'react';
import { signup } from '../../services/auth';

export default class SignUp extends Component {

  state = {
    username: '',
    password: '',
    message: '',
    name: '',
    lastName: '',
    email: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('TARGET', event.target, 'STATE', this.state)
    const { username, password, name, lastName, email } = this.state;
    signup(username, password, name, lastName, email)
    .then(data => {
      console.log(data)
      if (data.message) {
        this.setState({ 
          message: data.message,
          username: '',
          password: '',
          name: '',
          lastName: '',
          email: ''
        });
      } else {
        //put the user in the state of App.js
        this.props.setUser(data);
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <>
        <h2>Sign Up</h2>
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
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={ this.state.name }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={ this.state.lastName }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </>
    )
  }
}
