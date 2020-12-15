import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../services/auth';
import './NavBar.css'

export default function Navbar(props) {

  const handleLogout = (props) => {
    logout().then(() => {
      props.setUser(null)
    })
  }
    
  return (
    <nav className="navbar">
      <div className="logo">
        <Link className="link" to="/">Home</Link>
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
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        )}
    </nav>
  )
}
