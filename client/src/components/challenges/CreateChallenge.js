import React, { Component } from 'react';
import axios from 'axios';
import './Challenges.css'

export default class CreateChallenge extends Component {
  state = {
    title: '',
    goal: '',
    dailyTargetDescription: '',
    category: '',
    user: this.props.user,
    challengeID: '',
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitLater = async (event) => {
    event.preventDefault();
    let id = this.state.user._id;
    try {
      const newChallenge = await axios.post('/api/challenges', {
        title: this.state.title,
        goal: this.state.goal,
        dailyTarget: {
          description: this.state.dailyTargetDescription,
        },
        category: this.state.category,
      });

      let user = this.props.user;
      console.log(newChallenge);
      user.challenges.unshift({
        id: newChallenge.data._id,
        status: 'favorite',
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
      });
      this.setState({
        user: this.props.user,
      });
      const updatedUser = await axios.put(`/api/users/${id}`, {
        challenges: this.state.user.challenges, 
        rewards: this.state.user.rewards
      });
      console.log('updatedUser.data', updatedUser.data);
      this.props.setUser(updatedUser.data);
      this.props.history.push('/challenges');
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmitStart = async (event) => {
    event.preventDefault();
    let id = this.state.user._id;
    try {
      const newChallenge = await axios.post('/api/challenges', {
        title: this.state.title,
        goal: this.state.goal,
        dailyTarget: {
          description: this.state.dailyTargetDescription,
        },
        category: this.state.category,
      });
      console.log('', newChallenge.data);
      let user = this.props.user;
      await user.challenges.unshift({
        id: newChallenge.data._id,
        status: 'active',
        tracker:  [
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
        grandPrize: '',
      });
      await this.setState({
        user: this.props.user,
      });
      console.log(this.state);
      const updatedUser = await axios.put(`/api/users/${id}`, {
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

    return (
      <>
        <div className="create-challenge-page">
          <form
            className="create-challenge-form"
            id="create-challenge-form"
          >
            <h1>Create a Challenge</h1>
              <div className="create-challenge-form-fields">
                <div className="create-challenge-form-item">
                  <label htmlFor="title">Title: </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="Example Title: Get More Sleep"
                    required
                  />
                </div>
    
                <div className="create-challenge-form-item">
                  <label htmlFor="goal">
                    Goal:
                  </label>
                  <br />
                  <textarea
                    type="text"
                    id="goal"
                    name="goal"
                    value={this.state.goal}
                    onChange={this.handleChange}
                    placeholder="Example Goal: Improve my sleep habits so I feel more rested and alert throughout the day"
                    required textarea
                  />
                </div>
    
                <div className="create-challenge-form-item">
                  <label htmlFor="dailyTargetDescription">
                    Daily Action:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="dailyTargetDescription"
                    name="dailyTargetDescription"
                    value={this.state.dailyTargetDescription}
                    onChange={this.handleChange}
                    placeholder="Example Action: Get 8 hours of sleep each night"
                    required
                  />
                </div>
    
                <div className="create-challenge-form-item">
                  <label htmlFor="category">
                    Category &nbsp; &nbsp;
                  </label>
                  {/* <br /> */}
                  <select
                    name="category"
                    id="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    required>
                    <option value="health">Health</option>
                    <option value="fitness">Fitness</option>
                    <option value="career">Career</option>
                    <option value="productivity">Productivity</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            
            <div className="create-challenge-buttons">
              {/* <button className="button-light" form="create-challenge-form" onClick={this.handleSubmitLater}>
                Cancel
              </button> */}
              <button className="button-light" form="create-challenge-form" onClick={this.handleSubmitLater}>
                Save for later
              </button>
              <button className="button-dark" form="create-challenge-form" onClick={this.handleSubmitStart}>
                Start now!
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
