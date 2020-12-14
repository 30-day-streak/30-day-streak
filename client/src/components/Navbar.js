import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../services/auth';


const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null)
  })
}

export default function Navbar(props) {

  return (
    <nav className="">
        <Link to="/">Home</Link>
        <div className="nav-bar-right-side">
      {props.user ? (
        <>
            <Link to="/challenges">Challenges</Link>
            <Link to="/rewards">Rewards</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={() => handleLogout(props)}>Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
      </div>
    </nav>
  )
}

