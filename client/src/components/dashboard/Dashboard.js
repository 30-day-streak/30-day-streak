import React, { Component } from 'react';
// import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import ActiveChallengePreview from './ActiveChallengePreview';
import ActiveChallengeDetails from './ActiveChallengeDetails';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {
    user: '',
    reload: true,
  };

  // refreshPage() {
  //   window.location.reload(1);
  // }

  // componentDidMount = async () => {
  //   try {
  //     let loggedinUser = await axios.get('/users/loggedin')
  //     return loggedinUser
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    console.log(this.props.user)
    if (this.props.user) {
    
    const activeChallenges = this.props.user.challenges.filter(challenge => challenge.status === 'active')
    // users with no active challenges
    const userHasActiveChallenges = this.props.user.challenges.some(
      (challenge) => challenge.status === 'active'
    );

    if (!userHasActiveChallenges) {
      return (
        <div className="instruction-container">
          <h2>
            Welcome{' '}
            {this.props.user.name
              ? this.props.user.name
              : this.props.user.username}
            !{' '}
          </h2>
          <ol>
            <li>
              <Link to="/challenges">
                <button>BROWSE</button>
              </Link>{' '}
              the existing challenges, or{' '}
              <Link to="/challenges/create">
                <button>CREATE</button>
              </Link>{' '}
              your own. You can 'like' your favorite challenges and come back to
              them late when you're ready to start a challenge.
            </li>
            <li>
              <Link to="/rewards">
                <button>BROWSE</button>
              </Link>{' '}
              the existing rewards or{' '}
              <Link to="/rewards/create">
                <button>CREATE</button>
              </Link>{' '}
              your own motivate you. You get rewards when reaching a certain
              milestones. If you 'like' the ones that you favor, the reward will
              be generated amongst them.
            </li>
            <li>Let the streak begin!</li>
          </ol>
        </div>
      );

      // users with active challenges
    } else {
      // this.reload()
      // console.log('user from props', this.props.user);
      return (
        <>
          <h2>
            Welcome{' '}
            {this.props.user.name
              ? this.props.user.name
              : this.props.user.username}
            !{' '}
          </h2>
          <p>Your Active Challenges:</p>

          <div className="dashboard-container">
            {activeChallenges.map((challenge) => {
              return (
                <ActiveChallengePreview
                  challenge={challenge}
                  user={this.props.user}
                />
              );
            })}
          </div>
        </>
      );
      // builing the view for the logged in users here now
    }
  } else {
    return (
      <div>test</div>
    )
  }
  }
}
