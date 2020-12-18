import React from 'react';
import {Link} from 'react-router-dom';
import './Dashboard.css';


export default function DashboardNoActiveChallenges(props) {
  return (
    <div className="instruction-container">
      <h2>Welcome{' '}
        {props.user.firstName
          ? props.user.firstName
          : props.user.username} !
      </h2>
      <h4>You don't have any active challenges at the moment.<br/><br/>
      Browse challenges and rewards to save your favorite ones.<br/>
      You can also create your own! They will be automatically saved to your favorites.<br/><br/>
      When you feel ready go to challenges, pick one and let the adventure begin!</h4>
      
      <div className="button-container">
        <div className="one-button">
        <h5>Challenges</h5>
        <Link to="/challenges">
          <button className="bottom-dark">BROWSE</button>
        </Link>
        <Link to="/challenges/create">
          <button className="bottom-light">CREATE</button>
        </Link>
        </div>

        <div className="one-button">
        <h5>Rewards</h5>
        <Link to="/rewards">
            <button className="bottom-dark">BROWSE</button>
          </Link>
          <Link to="/rewards/create">
            <button className="bottom-light">CREATE</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
