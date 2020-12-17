import React, { Component } from 'react';
import FullTracker from './FullTracker';
import './ActiveChallengeDetails.css';

export default class ActiveChallengeDetails extends Component {
  state = {
    refreshToggle: true,
  };

  refreshActiveChallengeDetails = () => {
<<<<<<< HEAD
    // console.log(`toggleIn`, this.state.toggle);
    
    this.setState ({ refreshToggle: !this.state.refreshToggle });
    // console.log(`toggleOut`, this.state.toggle);
  }
=======
    console.log(`toggleIn`, this.state.toggle);
>>>>>>> 83e66d453b362765ecae4cd8d7e77309e787b67a

    this.setState({ refreshToggle: !this.state.refreshToggle });
    console.log(`toggleOut`, this.state.toggle);
  };

  render() {
<<<<<<< HEAD
    // console.log('props in active challange details', this.props.challenge);
    const { currentStreak, longestStreak } = this.props.streakStatus(this.props.challenge.tracker, this.props.challengeDay)
    // console.log(`current streak ${currentStreak}, Longest streak ${longestStreak}`);
    const daysLeft = 30 - this.props.challengeDay
=======
    console.log('props in active challange details', this.props.challenge);
    const { currentStreak, longestStreak } = this.props.streakStatus(
      this.props.challenge.tracker,
      this.props.challengeDay
    );
    console.log(
      `current streak ${currentStreak}, Longest streak ${longestStreak}`
    );
    const daysLeft = 30 - this.props.challengeDay;
>>>>>>> 83e66d453b362765ecae4cd8d7e77309e787b67a

    return (
      <div className="activeContainer">
        <p className="progress">Progress day {this.props.challengeDay}</p>
        <div className="active-challenge-details-user-info-container">
          {/* <div className="tracker-component"> */}
          <FullTracker
            challenge={this.props.challenge}
            user={this.props.user}
            key={this.props.challenge.id}
            challengeDay={this.props.challengeDay}
            calculateChallengeDay={this.props.calculateChallengeDay}
            refreshActiveChallengeDetails={this.refreshActiveChallengeDetails}
          />
          {/* </div> */}
          <div className="active-challenge-details-user-info-text">
            <p>Challenge started on:</p>
            <p>Challenge ends on:</p>
            <p> {daysLeft} days to go!</p>
            <p>Current streak: {currentStreak}</p>
            <p>Longest streak: {longestStreak}</p>

            <div className="active-challenge-details-prize">
              <p>
                EYES ON THE PRIZE: <br />
                {this.props.challenge.grandPrize}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
