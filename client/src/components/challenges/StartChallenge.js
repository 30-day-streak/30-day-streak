import React, { Component } from 'react';
import axios from 'axios';
import './Challenges.css';

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

  getChallenges = () => {
    const challengeId = this.props.match.params.id;
    axios
      .get(`/api/challenges/${challengeId}`)
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
    this.getChallenges();
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
      console.log('user from start challenge', user);
      console.log('challengeId from start challenge', challengeId);
      const alreadyInUser = user.challenges.some((challenge) => {
        console.log('challenge from some', challenge);
        return challenge.id === challengeId;
      });
      console.log('alreadyInUser', alreadyInUser);
      if (alreadyInUser) {
        user = user.challenges.map((challenge) => {
          if (challenge.id === challengeId) {
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
            challenge.grandPrize = this.state.prize;
          }
          return challenge;
        });
      // }
      } else {
        console.log('add challenges from startChallenge');
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
          grandPrize: this.state.prize,
        });
      }
      this.setState({
        user: this.props.user,
      });
      const updatedUser = await axios.put(`/api/users/${userId}`, {
        challenges: this.state.user.challenges,
        rewards: this.state.user.rewards,
      });
      this.props.setUser(updatedUser.data);
      // let updatedUser = await axios.get('/auth/loggedin')
      const { history } = this.props;
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="start-challenge-page">
        <div className="start-challenge-page-content">
          <h1>Congratulations!</h1>
          <p className="challenge-starting-info">
            Here is the information for the <b>challenge</b> you're starting{' '}
            <b>today</b>!
          </p>
          <div className="start-challenge-challenge-details">
            <h3>{this.state.title}</h3>
            <p>
              {' '}
              <b>Goal: </b>
              {this.state.goal}
            </p>
            <p>
              <b>Daily action: </b>
              {this.state.dailyTargetDescription} {this.state.dailyTargetNumber}{' '}
              {this.state.dailyTargetUnit}
            </p>
          </div>
          <h2>Pick your prize for completing it!</h2>
          <form onSubmit={this.handleSubmit}>
            {/* <label htmlFor="prize">Prize</label> */}
            <input
              type="text"
              id="prize"
              name="prize"
              value={this.state.prize}
              onChange={this.handleChange}
              required
              placeholder="Example: ticket to a concert"
            />
            <button
              className="button-dark"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              LET'S DO IT!
            </button>
          </form>
        </div>
      </div>
    );
  }
}