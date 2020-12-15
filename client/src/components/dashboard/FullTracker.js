import React, { Component } from 'react';
import axios from 'axios';
import './FullTracker.css';

export default class FullTracker extends Component {
  state = {
    user: '',
  };

  initialSetupTracker = () => {
    // console.log('challenge from setup', this.props.challenge.tracker);
    // this.setState({
    //   [name]: value,
    // });
    let tracker = this.props.challenge.tracker
    for(let i = 0; i < tracker.length; i++) { 
      let indexToString = i.toString()
      let trackerValue = tracker[i]
      // if(trackerValue === 1) {
      //   trackerValue = true
      // } else {
      //   trackerValue = false
      // }
      // console.log('tracker value updated', trackerValue);
      this.setState({
        [indexToString] : trackerValue
      })
    }
  }

  handleChange = async (event) => {
    try {
      const target = event.target;
      const value = target.checked;
      const name = target.id;
      // console.log('user tracker array', this.state.user.challenges[0].tracker);
      let challengeTracker = this.props.challenge.tracker
      let index = target.id;
      if (challengeTracker[index] === 0) {
        challengeTracker[index]++;
      } else if (challengeTracker[index] === 1) {
        challengeTracker[index]++;
      } else {
        challengeTracker[index]--;
      }
      // console.log('challenge tracker after click', challengeTracker);
      // console.log('state after click', this.state);
      this.setState({
        [name]: value,
      });
      let userId = this.state.user._id;
      const updatedUser = await axios.put(`/users/${userId}`, {
        challenges: this.state.user.challenges,
        rewards: this.state.user.rewards,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
    });
    this.initialSetupTracker()
  };

  render() {
    // const activeChallenges = this.props.user.challenges.filter(challenge => challenge.status === 'active')
    // console.log(this.state);
    // console.log('props from full tracker page', this.props);
    let challengeTracker = this.props.challenge.tracker
    return (
      <div className="full-tracker">
        Tracker for {this.props.challenge.id.title}
        <div>
          <br />
          {/* <fieldset id="one"> */}
          <div className={ ((challengeTracker[0] === 2) && 'failed') || ((challengeTracker[0] === 1) && 'completed') || ((challengeTracker[0] === 0) && 'not-attempted')} 
          onClick={this.handleChange} 
          id="0" 
          checked={this.state['0']}>1</div>

          <div 
          className={ ((challengeTracker[1] === 2) && 'failed') || ((challengeTracker[1] === 1) && 'completed') || ((challengeTracker[1] === 0) && 'not-attempted')} 
          onClick={this.handleChange} 
          id="1" 
          checked={this.state['1']}>2</div>
        </div>
      </div>
    );
  }
}
