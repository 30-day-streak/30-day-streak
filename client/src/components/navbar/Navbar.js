import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import './NavBar.css';

export default class Navbar extends Component {

  state = {
    menuIsOpen: false
  }

  handleChange = () => {
    this.setState((prevState) => ({ 
      menuIsOpen: !prevState.menuIsOpen,
    }))
  }

  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null)
    })
    this.setState((prevState) => ({ 
      menuIsOpen: !prevState.menuIsOpen,
    }))
  }

  render() {
    return (
      <nav id="main-nav" className={this.state.menuIsOpen ? "navbar dropdown-opened" : "navbar" }>
        <div className="navbar-logo">
          <Link className="link" to="/">
            <img src="./images/logoLight.png" alt="logo link to homepage" width="30vw" className="navbar-logo"/>
          </Link>
        </div>
        <img 
          src="./images/menu.png" 
          alt="menu button" 
          className="mobile-dropdown-toggle" 
          aria-hidden="true"
          onClick={ this.handleChange }
        />
        {/* <div className="dropdown-link-container"> */}
          {this.props.user ? (
            <div className="dropdown-link-container">
              <Link className="link" to="/challenges" onClick={ this.handleChange }>Challenges</Link>
              <Link className="link" to="/rewards" onClick={ this.handleChange }>Rewards</Link>
              <Link className="link" to="/profile" onClick={ this.handleChange }>Profile</Link>
              <Link className="link" to="/logout" onClick={() => this.handleLogout()}>Log Out</Link>
            </div>
          ) : (
            <div className="dropdown-link-container">
              <Link className="link" to="/signup" onClick={ this.handleChange }>Sign Up</Link>
              <Link className="link" to="/login" onClick={ this.handleChange }>Log In</Link>
            </div>
            )}
        {/* </div> */}
      </nav>
    )
  }
}

