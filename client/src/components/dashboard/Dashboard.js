import React, { Component } from 'react';
import './Dashboard.css';
import ActiveChallengePreview from './ActiveChallengePreview';
import DashboardHome from './DashboardHome';
import DashboardNoActiveChallenges from './DashboardNoActiveChallenges';

export default class Dashboard extends Component {

  calculateChallengeDay = (created_at) => {
    const startAsMilliseconds = new Date(created_at).getTime();
    return Math.ceil(new Date() / 86400000) -
      Math.floor([startAsMilliseconds] / 86400000);
  }

  streakStatus = (arr, days) => {
    let s = arr[0].toString();
    for (let i = 1; i < days; i++) {
      if (arr[i] !== arr[i - 1]) s += " ";
      s += arr[i];
    }
    // calculate total days successfully completed
    const completed = s.split('1').length - 1

    //split data into streaks
    let streaks = s.split(" ")
    streaks = streaks.filter(streak => streak[0] === "1")
    //find longest streak
    let longest = 0
    streaks.forEach(streak => {
      let streakLength = streak.length;
      if (streakLength > longest) longest = streakLength;
    })
    //compile return array
    let output = {
      currentStreak: 0,
      longestStreak: longest,
      daysCompleted: completed
    }
    if (arr[days - 1] === 1) {
      output.currentStreak = streaks[streaks.length - 1].length
    }
    return output
  }

  render() {

// logged in user
    if (this.props.user) {
      const activeChallenges = this.props.user.challenges.filter(challenge => challenge.status === 'active')
      const userHasActiveChallenges = this.props.user.challenges.some(
        (challenge) => challenge.status === 'active'
      );

// users with no active challenges
      if (!userHasActiveChallenges) {
        return (
          <DashboardNoActiveChallenges user={ this.props.user } />
        );
      
// users with active challenges
      } else {
        return (
          <>
            <h2>Welcome{' '}
              {this.props.user.firstName
                ? this.props.user.firstName
                : this.props.user.username}!
            </h2>
            <p>Your Active Challenges:</p>

            <div className="dashboard-container">
              { activeChallenges.map((challenge) => {
                  return (
                    <ActiveChallengePreview
                      challenge={challenge}
                      user={this.props.user}
                      calculateChallengeDay={this.calculateChallengeDay}
                      streakStatus={this.streakStatus}
                      setUser={this.props.setUser}
                      {...this.props}
                    />
                  );
                })
              }
            </div>

          </>
        );
      }

// guest user (not logged in)
    } else {
      return (
        <DashboardHome />
      )
    }
  }
}
