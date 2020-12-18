import React, { Component } from 'react';
import { login } from '../../services/auth';
import './Auth.css';

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
      <div className="auth-container">
        <div className="left">
          <div className="header">
            <h2 className="animation a1">Welcome Back</h2>
            <h4 className="animation a2">Log in to your account using username and password</h4>
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
              <br/>
              <button className="button-dark animation a6"type="submit">Log In</button>
            </form>
          </div>
        </div>
        <div className="right"></div>
      </div>
    )
  }
}

   {/* <div class="container">
        <div class="left">
          <div class="header">
            <h2 class="animation a1">Welcome Back</h2>
            <h4 class="animation a2">Log in to your account using email and password</h4>
          </div>
          <div class="form">
            <input type="email" class="form-field animation a3" placeholder="Email Address"/>
            <input type="password" class="form-field animation a4" placeholder="Password"/>
            <p class="animation a5"><a href="#">Forgot Password</a></p>
            <button class="animation a6">LOGIN</button>
          </div>
        </div>
        <div class="right"></div>
      </div> */}