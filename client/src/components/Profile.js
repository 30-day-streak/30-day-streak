import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  render() {
    console.log(this.props.user);
    return (
      <>
        <div className="profile-basic-info">
          <h2>Profile</h2>
          <p>
            <b>Username:</b> {this.props.user.username}
          </p>
          <p>
            <b>Name:</b> {this.props.user.firstName} {this.props.user.lastname}
          </p>
        </div>
        <div className="profile-challenges-history">
          <h2>Challenge History</h2>
          <select name="history" id="history">
            <option>Select</option>
            <option value="createdByMe">Created by me</option>
            <option value="completed">Completed</option>
            <option value="recommended">Recommended</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
      </>
    );
  }
}
