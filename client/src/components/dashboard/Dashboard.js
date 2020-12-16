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

  render() {
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
          <h4>You don't have any active challenges at the moment.<br/><br/>
          Browse challenges and rewards to save your favorite ones.<br/>
          You can also create your own! They will be automatically saved to your favorites.<br/><br/>
          When you feel ready go to challenges, pick one and let the adventure begin!</h4>
          
          <div className="button-container">
            <div className="one-button">
            <h5>Challenges</h5>
            <Link to="/challenges">
              <button>BROWSE</button>
            </Link>
            <Link to="/challenges/create">
              <button>CREATE</button>
            </Link>
            </div>
  
            <div className="one-button">
            <h5>Rewards</h5>
            <Link to="/rewards">
                <button>BROWSE</button>
              </Link>
              <Link to="/rewards/create">
                <button>CREATE</button>
              </Link>
            </div>
          </div>
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
      <div className="welcome-container">
        {/* intro */}
        <div className="scroll-container one" >
          {/* <img src="/images/challenge.jpg" alt="challenge"/> */}
            <h1>30-DAY-CHALLENGE</h1>
            <h2>Think about something you always wanted to add to your life and try it for the next 30 days...</h2>
            <h2>30 days just about the right amount of time to add a new habit or substract a habit.</h2>
            <h2><strong>So... what are you waiting for?</strong></h2>
        </div>
        {/* WHY do it? > video */}
        <div className="scroll-container two">
          <h1>Why do a 30-day challenge?</h1>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/UNP03fDSj1U"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>

        {/* How do get started? */}
        <div className="scroll-container light three">
          <h1>How to get started?</h1>
        </div>

        {/* Tips on how to make the habits stick */}
        <div className="scroll-container dark four">
          <p>Starting a new habit is hard.<br/><br/>
          Breaking a bad one is even harder.<br/><br/>
          In a 30-day challenge, you're just experimenting with new behavior.<br/> It's like downloading a trial version of 
          the software. You don’t actually “buy into” the habit change until the end of the test period. 
          Only then will you decide to keep it or not.</p>
          <p>Here are 9 suggestions for building habits that stick: </p>
          <ol>
            <li>Focus on 1 habit at the time</li>
            <li>Commit to a minimum of 30 days</li>
            <li>Anchor a new habit to an established routine</li>
            <li>Take baby steps - micro commitments</li>
            <li>Don’t break the chain. </li>
            <li>Plan for obstacles and challenges</li>
            <li>Create accountability for your work habit</li>
            <li>Reward important milestones</li>
            <li>Build a new identity</li>
          </ol>
        </div>
      </div>
    )
  }
  }
}
