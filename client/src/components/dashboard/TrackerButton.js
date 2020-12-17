import React, { Component } from 'react';
import './FullTracker.css'

export default class TrackerButton extends Component {
  render() {
    console.log('tracker props', this.props);
    let challengeTracker = this.props.challenge.tracker;
    let index = this.props.index
    let label = Number.parseInt(index) + 1
    return (
      // <div>Test Tracker Button</div>
      <div
        className={
          (challengeTracker[`${index}`] === 2 && 'failed') ||
          (challengeTracker[`${index}`] === 1 && 'completed') ||
          (challengeTracker[`${index}`] === 0 && 'not-attempted')
        }
        onClick={this.props.handleChange}
        id={index}
      >
        {label}
      </div>
    );
  }
}
