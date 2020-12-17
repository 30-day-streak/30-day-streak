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
<<<<<<< HEAD
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
              title="embedded YouTube"
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
=======
        <DashboardHome />
>>>>>>> main
      )
    }
  }
}
