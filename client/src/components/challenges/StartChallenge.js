import React, { Component } from 'react';
import axios from 'axios';
import Challenges from './Challenges';
import  { Redirect } from 'react-router-dom'


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
    // console.log(this.state);
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
    let userId = this.state.user._id;
    const challengeId = this.props.match.params.id;
    try {
      let user = this.props.user;
      const alreadyInUser = user.challenges.some((challenge) => {
        return challenge.id._id === challengeId;
      });
      if (alreadyInUser) {
        user = user.challenges.map((challenge) => {
          if (challenge.id._id === challengeId) {
            // console.log('match');
            // console.log('challenge.status', challenge.status);
            challenge.status = 'active';
            challenge.startDate = new Date();
            challenge.tracker = [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ];
            challenge.grandPrize = this.state.prize
          }
          // console.log('challenge after update', challenge);
          return challenge;
        });
      } else {
        user.challenges.unshift({
          id: this.props.match.params.id,
          status: 'active',
          tracker: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          startDate: new Date(),
          grandPrize: this.state.prize
        });
      }
      this.setState({
        user: this.props.user,
      });
      console.log('user challlenges after set state', this.state.user.challenges);
      console.log('user rewards after set state', this.state.user.rewards);


      const updatedUser = await axios.put(`/users/${userId}`, {
        challenges: this.state.user.challenges,
        rewards: this.state.user.rewards,
      });
      const {history} = this.props
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log('user from state in render', this.state.user);
    // console.log('user from the props in render', this.props.user);
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
            <button type="submit" onSubmit={this.handleSubmit}>
              Let's do it!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
