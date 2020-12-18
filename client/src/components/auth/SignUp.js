import React, { Component } from 'react';
import { signup } from '../../services/auth';
// import './Auth.css';

export default class SignUp extends Component {

  state = {
    username: '',
    password: '',
    message: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, firstName, lastName, email } = this.state;
    signup(username, password, firstName, lastName, email)
    .then(data => {
      if (data.message) {
        this.setState({ 
          message: data.message,
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div className="auth-container">
        <div className="left">
          <div className="header">
            <h2 className="animation a1">Welcome</h2>
            <h4 className="animation a2">Sign up to start a 30-day-challenge</h4>
          </div>
          <div className="form">
            <form onSubmit={ this.handleSubmit }>

              <div className="form-field-box">
                {/* <label htmlFor="username">Username: </label> */}
                <input
                  className="form-field animation a3"
                  type="text"
                  id="username"
                  name="username"
                  value={ this.state.username }
                  onChange={ this.handleChange }
                  placeholder="Username"
                />
              </div>

              <div className="form-field-box">
                {/* <label htmlFor="password">Password: </label> */}
                <input
                  className="form-field animation a4"
                  type="password"
                  id="password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.handleChange }
                  placeholder="Password"
                />
              </div>

              {this.state.message && (
                <p>{ this.state.message }</p>
              )}

              <div className="form-field-box">
                {/* <label htmlFor="firstName">Name: </label> */}
                <input
                  className="form-field animation a3"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={ this.state.firstName }
                  onChange={ this.handleChange }
                  placeholder="First Name"
                />
              </div>
              <div className="form-field-box">
                {/* <label htmlFor="lastName">Last Name: </label> */}
                <input
                  className="form-field animation a4"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={ this.state.lastName }
                  onChange={ this.handleChange }
                  placeholder="Last Name"
                />
              </div>
              <div className="form-field-box">
                {/* <label htmlFor="email">Email: </label> */}
                <input
                  className="form-field animation a3"
                  type="email"
                  id="email"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.handleChange }
                  placeholder="Email"
                />
              </div>
              <br/>
              <button className="button-dark animation a6" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
        <div className="right"></div>
      </div>
    )
  }
}


