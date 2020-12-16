import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CreateChallenge.css'

export default class CreateChallenge extends Component {
  state = {
    title: '',
    goal: '',
    dailyTargetDescription: '',
    category: 'eat',
    user: this.props.user,
    challengeID: '',
  };

  handleChange = (event) => {
    // console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitLater = async (event) => {
    console.log('clicked');
    event.preventDefault();
    console.log('user before post', this.state.user);
    let id = this.state.user._id;
    try {
      const newChallenge = await axios.post('/challenges', {
        title: this.state.title,
        goal: this.state.goal,
        dailyTarget: {
          description: this.state.dailyTargetDescription,
        },
        category: this.state.category,
      });

      let user = this.props.user;
      console.log('user', this.props.user);
      user.challenges.unshift({
        id: newChallenge.data._id,
        status: 'favorite',
        tracker: [],
      });
      this.setState({
        user: this.props.user,
      });
      console.log('user after set state', this.state.user);

      const updatedUser = await axios.put(`/users/${id}`, {
        challenges: this.state.user.challenges, 
        rewards: this.state.user.rewards
      });
      this.props.history.push('/challenges');
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmitStart = async (event) => {
    // console.log('clicked');
    event.preventDefault();
    // console.log('user before post', this.state.user);
    let id = this.state.user._id;
    try {
      const newChallenge = await axios.post('/challenges', {
        title: this.state.title,
        goal: this.state.goal,
        dailyTarget: {
          description: this.state.dailyTargetDescription,
        },
        category: this.state.category,
      });

      let user = this.props.user;
      // console.log('user', this.props.user);
      user.challenges.unshift({
        id: newChallenge.data._id,
        status: 'active',
        tracker: [],
      });
      this.setState({
        user: this.props.user,
      });
      // console.log('user after set state', this.state.user);

      const updatedUser = await axios.put(`/users/${id}`, {
        challenges: this.state.user.challenges, 
        rewards: this.state.user.rewards
      });
      this.props.history.push(`/challenges/${newChallenge.data._id}/start`);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
  }

  render() {
    // console.log(this.props.user);
    return (
      <>
        <div className="create-challenge-page">
          <form
            className="create-challenge-form"
            id="create-challenge-form"
          >
            <h1>Create a Challenge</h1>
            {/* <h3>Here you can make your own customized challenge</h3> */}
            <div className="create-challenge-form-item">
              <label htmlFor="title">Name your challenge: </label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Example: Get More Sleep"
                required
              />
            </div>

            <div className="create-challenge-form-item">
              <label htmlFor="goal">
                What do you want to accomplish with this challenge?
              </label>
              <br />
              <input
                type="text"
                id="goal"
                name="goal"
                value={this.state.goal}
                onChange={this.handleChange}
                placeholder="Example: Improve my sleep habits so I feel more rested and alert throughout the day"
                required
              />
            </div>

            <div className="create-challenge-form-item">
              <label htmlFor="dailyTargetDescription">
                What will you do every day to meet this goal?
              </label>
              <br />
              <input
                type="text"
                id="dailyTargetDescription"
                name="dailyTargetDescription"
                value={this.state.dailyTargetDescription}
                onChange={this.handleChange}
                placeholder="Example: Get 8 hours of sleep each night"
                required
              />
            </div>

            {/* <div className="create-challenge-form-item">
          <label htmlFor="dailyTargetNumber">Daily Target Number</label>
          <br/>
          <input
            type="number"
            id="dailyTargetNumber"
            name="dailyTargetNumber"
            value={this.state.dailyTargetNumber}
            onChange={this.handleChange}
          />
          </div>

          <div className="create-challenge-form-item">
          <label htmlFor="dailyTargetUnit">Daily Target Unit</label>
          <br/>
          <input
            type="text"
            id="dailyTargetUnit"
            name="dailyTargetUnit"
            value={this.state.dailyTargetUnit}
            onChange={this.handleChange}
          />
          </div> */}

            <div className="create-challenge-form-item create-challenge-form-select">
              <label htmlFor="category">
                What category does your challenge fall into?
              </label>
              <br />
              <select
                name="category"
                id="category"
                value={this.state.category}
                onChange={this.handleChange}
                required
              >
                <option value="eat">Eat</option>
                <option value="train">Train</option>
                <option value="habit">Habit</option>
                <option value="skill">Skill</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="button-light" form="create-challenge-form" onClick={this.handleSubmitLater}>
              Save challenge for later
            </button>
            <button className="button-dark" form="create-challenge-form" onClick={this.handleSubmitStart}>Start challenge now!</button>
          </form>
        </div>
      </>
    );
  }
}
