import React, { Component } from 'react';
import FullTracker from './FullTracker';

export default class ActiveChallengeDetails extends Component {
  render() {
    // console.log('props from active challange details', this.props)
    return (
      <div className="activeContainer">
        <FullTracker challenge={this.props.challenge} user={this.props.user} key={this.props.challenge.id}/>
      </div>
    );
  }
}
