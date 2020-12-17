import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';

export default class Profile extends Component {
  state = {
    challenges: [],
    statusFilter: '',
    ownerFilter: false,
  };

  getData = () => {
    axios
      .get('/api/challenges')
      .then((response) => {
        console.log('HERE', response.data);
        this.setState({
          challenges: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  filter = () => {
    if (this.state.ownerFilter) {
      return this.state.challenges.filter((challenge) => {
        // console.log('OWNER', challenge.owner, 'USER', this.props.user._id, 'EQUAL?', challenge.owner === this.props.user._id)
        console.log('CHALLENGE', challenge);
        return challenge.owner === this.props.user._id;
      });
    } else {
      return this.props.user.challenges.filter((challenge) => {
        //exclude active and favorite
        return (
          challenge.status !== 'active' &&
          challenge.status !== 'favorite' &&
          // filter challenge status - completed or withdrawn
          (this.state.statusFilter === challenge.status ||
            !this.state.statusFilter)
        );
      });
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const filtered = this.filter();
    // console.log('FILTERED', filtered)
    console.log('status', this.state.statusFilter);
    console.log('challenges', this.state.challenges);

    return (
      <>
        <div className="profile-page-all-info">
          <div className="profile-basic-info">
            <h2>Profile</h2>
            <p>
              <b>Username:</b> {this.props.user.username}
            </p>
            <p>
              <b>Name:</b> {this.props.user.firstName}{' '}
              {this.props.user.lastName}
            </p>
            <p>
              <b>Email:</b> {this.props.user.email}
            </p>
          </div>
          <hr className="profile-divider-line"/>
          <div className="profile-challenges-history">
            <h2>Challenge History</h2>

            <div className="tool-box">
              <div className="statusFilter">
                <select
                  name="statusFilter"
                  id="statusFilter"
                  onChange={this.handleChange}
                >
                  <option value="">Show All</option>
                  <option value="completed">Completed</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>

              <div className="filter">
                <input
                  type="checkbox"
                  id="ownerFilter"
                  name="ownerFilter"
                  onChange={this.handleChange}
                />
                <label htmlFor="ownerFilter">Created by me</label>
              </div>
            </div>

            <div className="challenges-container">
              {filtered.map((challenge) => {
                if (this.state.ownerFilter) {
                  return (
                    <div className="card" key={challenge._id}>
                      <div className="card-header">
                        <p>{challenge.category}</p>
                      </div>
                      <h3>{challenge.title}</h3>
                      <hr />
                      <p>
                        <strong>Goal:</strong> {challenge.goal}
                      </p>
                      <p>
                        <strong>Daily Target:</strong>{' '}
                        {challenge.dailyTarget.description}{' '}
                        {challenge.dailyTarget.number}{' '}
                        {challenge.dailyTarget.unit}
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="card" key={challenge._id}>
                    <div className="card-header">
                      <p>{challenge.id.category}</p>
                    </div>
                    <h3>{challenge.id.title}</h3>
                    <hr />
                    <p>
                      <strong>Status:</strong> {challenge.status}
                    </p>
                    <p>
                      <strong>Goal:</strong> {challenge.id.goal}
                    </p>
                    <p>
                      <strong>Daily Target:</strong>{' '}
                      {challenge.id.dailyTarget.description}{' '}
                      {challenge.id.dailyTarget.number}{' '}
                      {challenge.id.dailyTarget.unit}
                    </p>
                    <p>
                      <strong>Start date:</strong>{' '}
                      {challenge.startDate && challenge.startDate}
                    </p>
                    <p>
                      <strong>Grand Prize:</strong> {challenge.grandPrize}
                    </p>
                  </div>
                  // { this.props.challenge.status }, { this.props.challenge.tracker }
                  // { this.props.challenge.id._id }  { this.props.challenge.id.owner }
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
