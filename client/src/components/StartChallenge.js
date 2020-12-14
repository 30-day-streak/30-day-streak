import React, { Component } from 'react';
import axios from 'axios';
import Challenges from './Challenges';

export default class StartChallenge extends Component {
  state = {
    title: '',
    goal: '',
    dailyTargetDescription: '',
    dailyTargetNumber: '',
    dailyTargetUnit: '',
    prize: '',
    user: '',
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  getData = () => {
    const challengeId = this.props.match.params.id;
    // console.log('id from request',id);
    axios
      .get(`/challenges/${challengeId}`)
      .then((response) => {
        this.setState({
          title: response.data.title,
          goal: response.data.goal,
          dailyTargetDescription: response.data.dailyTarget.description,
          dailyTargetNumber: response.data.dailyTarget.number,
          dailyTargetUnit: response.data.dailyTarget.unit,
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  // activate this with get data
  componentDidMount = () => {
    this.getData();
    this.setState({
      user: this.props.user,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('user before post', this.props.user);
    let userId = this.state.user._id;
    const challengeId = this.props.match.params.id;
    try {
      let user = this.props.user;
      // console.log('first user', user);
      const alreadyInUser = user.challenges.some((challenge) => {
        return challenge.id === challengeId;
      });
      if (alreadyInUser) {
        user = user.challenges.map((challenge) => {
          if (challenge.id === challengeId) {
            challenge.status = 'active';
            challenge.startDate = new Date()
          }
          return challenge
        });
      } 
      else {
        return user.challenges.unshift({
          id: this.props.match.params.id,
          status: 'active',
          tracker: [],
          startDate: new Date()
        });
      }
      // console.log('user after click', user);
      this.setState({
        user: this.props.user,
      });
      // console.log('user after set state', this.state.user);

      const updatedUser = await axios.put(`/users/${userId}`, {
        challenges: this.state.user.challenges, 
        rewards: this.state.user.rewards,
      });
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  // test = () => {
  //   console.log('test button clicked');
  //   axios.put('/users/test');
  // };

  render() {
    // console.log(this.props);
    return (
      <div className="start-challenge-page">
        <div className="start-challenge-page-content">
          <h1>Congratulations!</h1>
          <h2>
            Here is the information for the CHALLENGE you're starting TODAY!
          </h2>
          <h3>{this.state.title}</h3>
          <p>Goal: {this.state.goal}</p>
          <p>
            Daily target: {this.state.dailyTargetDescription}{' '}
            {this.state.dailyTargetNumber} {this.state.dailyTargetUnit}
          </p>
          <h2>Pick your GRAND PRIZE for completing it</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="prize">Prize</label>
            <input
              type="text"
              id="prize"
              name="prize"
              value={this.state.prize}
              onChange={this.handleChange}
              required
            />
            <button onClick={this.handleSubmit}>Let's do it!</button>
          </form>
        </div>
      </div>
    );
  }
}
