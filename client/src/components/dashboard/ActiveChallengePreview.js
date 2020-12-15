import React, { Component } from 'react';
import axios from 'axios';


export default class ActiveChallenge extends Component {
  render() {
    return (
      <div className="active-preview">
        <div className= "preview-title">
          <h5 >{ this.props.challenge.id.title }</h5>
        </div>
        <div className="preview-tracker">
          <span>Tracker</span>
        </div>
        <div className="preview-streak">
          <span>Streak</span>
        </div>
      </div>
    )
  }
}
