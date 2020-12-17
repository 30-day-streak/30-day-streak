import React, { Component } from 'react';
import axios from 'axios';
import ActiveChallengeDetails from './ActiveChallengeDetails';
import TrackerButton from './TrackerButton';
import './Dashboard.css';

export default class ActiveChallengePreview extends Component {
  state = {
    challengeDay: 0,
    activeChallengeDetails: false,
    user: '',
  };

  toggleChallengeDetails = () => {
    this.setState((prevState) => ({
      activeChallengeDetails: !prevState.activeChallengeDetails,
    }));
  };

  selectReward = () => {
    const rewards = this.props.user.rewards;
    const chosenRewardIndex = Math.floor(Math.random() * rewards.length);
    return rewards[chosenRewardIndex];
  };

  notifier = async() => {
    const today = this.state.challengeDay;
    const thisProjectsTracker = this.props.challenge.tracker;
    const streakStatusData = this.props.streakStatus(this.props.challenge.tracker, today);
    const userID = this.props.userId;
    let changedToggle = "";
    console.log(`notifier called`);
    console.log({ today });
    console.log(`todays val`, thisProjectsTracker[today - 1]);

    console.log({ streakStatusData });



    //7-day streak
    if (thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 7
      && this.props.challenge.subGoals7DayStreak === false
    ) {
      changedToggle = "subGoals7DayStreak";
      let todaysReward = this.selectReward();
      await this.props.notifyMilestone(["7", todaysReward, this.props.challenge.id, changedToggle]);

      console.log(`7 day streak`);
      this.props.challenge.subGoals7DayStreak = true;
      return    }

    //half-way
    if (thisProjectsTracker[today - 1] === 1 &&
      (today === 15 || today === 16 || today === 17)
      && this.props.challenge.notification15Days === false
    ) {
      console.log(this.props.challenge.notification15Days);
      changedToggle = "notification15Days";
      await this.props.notifyMilestone(["15", {}, this.props.challenge.id, changedToggle]);
      console.log(`half way`);
      this.props.challenge.notification15Days = true;
      console.log(this.props.challenge.notification15Days);
      return
    }

    //21-day streak
    if (thisProjectsTracker[today - 1] === 1 &&
      streakStatusData.currentStreak === 21
      && this.props.challenge.subGoals21DayStreak === false
    ) {
      let todaysReward = this.selectReward();
      changedToggle = "subGoals21DayStreak";
      await this.props.notifyMilestone(["21", todaysReward, this.props.challenge.id, changedToggle]);
      console.log(`21-day streak`);
      this.props.challenge.subGoals21DayStreak = true;
      return
    }

    //nearly there
    if (thisProjectsTracker[today - 1] === 1 &&
      today === 28
      && this.props.challenge.notification28Days === false
    ) {
      changedToggle = "notification28Days";
      await this.props.notifyMilestone(["28", {}, this.props.challenge.id, changedToggle]);

      console.log(`nearly there`);
      this.props.challenge.notification28Days = true;
      return
    }

    //completion
    if (today >= 30
      && this.props.challenge.notificationComplete === false
    ) {
      if (streakStatusData.daysCompleted === 30) {

        changedToggle = "notificationCompleted"
        await this.props.notifyMilestone(["success", {}, this.props.challenge.id, changedToggle]);
        console.log(`notify complete`);
        //main goal
      } else {
        console.log(`notify near complete`);
        changedToggle = "notificationCompleted"
        await this.props.notifyMilestone(["notQuite", {}, this.props.challenge.id, changedToggle]);
      }
      this.props.challenge.notificationComplete = true;
      return
    };
  }

  componentDidMount() {
    const challengeDay = this.props.calculateChallengeDay(this.props.challenge.startDate);
    this.setState({
      challengeDay: challengeDay,
    })
    console.log(`startdate`, this.props.challenge.startDate);

  }


  // withdrawFromChallenge = async () => {
  //   try {
  //     const updatedUser = await axios.put(`/api/users/${this.props.challenge.id._id}/withdraw`)
  //     this.props.setUser(updatedUser.data)
  //     console.log('updated user data', updatedUser.data);
  //     // console.log(this.);
  //     this.props.history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  handleChange = async (event) => {
    console.log(this.props.user);

    try {
      const target = event.target;
      const value = target.checked;
      const name = target.id;
      // console.log('target', target, 'value', value, 'name', name);
      let challengeTracker = this.props.challenge.tracker;
      console.log('challenge tracker from one button', challengeTracker);
      let index = target.id;
      if (event.target.id < this.state.challengeDay) {
        if (challengeTracker[index] === 0) {
          challengeTracker[index]++;
        } else if (challengeTracker[index] === 1) {
          challengeTracker[index]++;
        } else {
          challengeTracker[index]--;
          challengeTracker[index]--;

        }
        this.setState({
          [name]: value,
        });
        let userId = this.props.user._id;
        const updatedUser = await axios.put(`/api/users/${userId}`, {
          challenges: this.props.user.challenges,
          rewards: this.props.user.rewards,
        });

        this.props.setUser(updatedUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  componentDidMount = async () => {
    try {
      const challengeDay = this.props.calculateChallengeDay(
        this.props.challenge.startDate
      );
      // console.log({challengeDay});
      // console.log('updated user from mount', updatedUser.data);
      this.setState({
        challengeDay: challengeDay,
        user: this.props.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // componentDidUpdate(prevProps) {
  //   console.log('prev props from active challenge preview', prevProps);
  // }


  render() {
    // console.log('user challenges at render', this.props.user.challenges);
    // console.log('challenge props from render', this.props.challenge)
    const challengeDay = this.state.challengeDay;
    const todayIndex = challengeDay - 1;
    // if (!this.props.challenge.id.title) {
    //   window.location.reload(false);
    // } else {
    // console.log('props from preview ');
    return (
      <div className="active-preview">
        <div className="active-preview-no-button">
          <div className="preview-challenge-info">
            <h5>{this.props.challenge.id.title}</h5>
            <p>{this.props.challenge.id.goal}</p>
            <p>
              {this.props.challenge.id.dailyTarget.description}
              {this.props.challenge.id.dailyTarget.number}
              {this.props.challenge.id.dailyTarget.unit}
            </p>
          </div>
          <div className="awesome-button">
            <p>
              Click below to <br /> log today:{' '}
            </p>
            <TrackerButton
              index={todayIndex}
              user={this.props.user}
              handleChange={this.handleChange}
              challenge={this.props.challenge}
              challengeDay={this.state.challengeDay}
            />
          </div>


        </div>
        {this.state.activeChallengeDetails && (
          <ActiveChallengeDetails
            challenge={this.props.challenge}
            user={this.props.user}
            challengeDay={this.state.challengeDay}
            calculateChallengeDay={this.props.calculateChallengeDay}
            streakStatus={this.props.streakStatus}
            notifier={this.notifier}
            setUser={this.props.setUser}
          />
        )}
        {!this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            SHOW DETAILS
          </button>
        )}
        {/* {this.state.activeChallengeDetails && (
          
        )} */}
        {this.state.activeChallengeDetails && (
          <button className="button-dark" onClick={this.toggleChallengeDetails}>
            HIDE DETAILS
          </button>
        )}
      </div>
    );
  }
}
// }
 