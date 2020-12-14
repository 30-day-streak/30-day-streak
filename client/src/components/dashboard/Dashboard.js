import React, { Component } from 'react'
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
​
export default class Dashboard extends Component {
  render() {

    // users with no challenges
  const activeChallenges = this.props.user.challenges.some(challenge => challenge.status === 'active')
​
    if (!activeChallenges) {
      return (
        <div className="instruction-container">
          <h2>Welcome { this.props.user.name ? this.props.user.name : this.props.user.username }! </h2>
          <ol>
            <li>
              <Link to="/challenges"><button>BROWSE</button></Link> the existing challenges, or <Link to="/challenges/create"><button>CREATE</button></Link> your own. 
              You can 'like' your favorite challenges and come back to them late when you're ready to start a challenge.
            </li>
            <li>
              <Link to="/rewards"><button>BROWSE</button></Link> the existing rewards or <Link to="/rewards/create"><button>CREATE</button></Link> your own motivate you.
              You get rewards when reaching a certain milestones. If you 'like' the ones that you favor, the reward will be generated amongst them.
            </li>
            <li>
              Let the streak begin!
            </li>
          </ol>
        </div>
      )
    // users with active challenges
    } else {
      return (
        <div>TEST</div>
      )
      // builing the view for the logged in users here now
    }
  }
}