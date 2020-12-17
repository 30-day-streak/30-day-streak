import React, { Component } from 'react';
// import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ActiveChallengePreview from './ActiveChallengePreview';
// import ActiveChallengeDetails from './ActiveChallengeDetails';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {
    user: '',
    reload: true,
  };

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

  componentDidMount = async () => {
    // try {
    //   let loggedinUser = await axios.get('/users/')
    //   return loggedinUser
    // } catch (error) {
    //   console.log(error);
    // }
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
                    calculateChallengeDay={this.calculateChallengeDay}
                    streakStatus={this.streakStatus}
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
        <div>
          Think about something you always wanted to add to your life and try it for the next 30 days.
          30 days just about the right amount of time to add a new habit or substract a habit.
          If you really want something badly enough, you can do ANYTHING for 30 days
        </div>
      )
    }
  }
}
