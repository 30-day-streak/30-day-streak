import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import './NavBar.css'

export default function Navbar(props) {

  const handleLogout = (props) => {
    console.log('logout')
    logout().then(() => {
      props.setUser(null)
    })
    console.log('logout successful')
  }

  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link className="link" to="/">
        <img src="./images/logoLight.png" alt="logo link to homepage" width="50vw" className="navbar-logo"/>
        </Link>
      </div>
      {props.user ? (
        <div className="links">
          <Link className="link" to="/challenges">Challenges</Link>
          <Link className="link" to="/rewards">Rewards</Link>
          <Link className="link" to="/profile">Profile</Link>
          <Link className="link" to="/login" onClick={() => handleLogout(props)}>Log Out</Link>

        </div>
      ) : (
          <div className="links">
            <Link className="link" to="/signup">Sign Up</Link>
            <Link className="link" to="/login">Log In</Link>
          </div>
        )}
    </nav>
  )
}

