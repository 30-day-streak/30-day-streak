import React, { Component } from 'react';
import FullTracker from './FullTracker';

export default class ActiveChallengeDetails extends Component {
  render() {
    // console.log('props from active challange details', this.props);
    const activeChallenges = this.props.user.challenges.filter(
      (challenge) => challenge.status === 'active'
    );
    console.log('active challenges', activeChallenges);
    return (
      <div className="activeContainer">
      {activeChallenges.map((challenge) => (
        <FullTracker challenge={challenge} user={this.props.user}/>
      ))}
        {/* <FullTracker user={this.props.user}/> */}
      </div>
    );
  }
}
