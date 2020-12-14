import React, { Component } from 'react';
import axios from 'axios';

export default class CreateChallenge extends Component {
  state = {
    title: '',
    goal: '',
    dailyTargetDescription: '',
    dailyTargetNumber: '',
    dailyTargetUnit: '',
    category: '',
    // private: '',
  };

  handleChange = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.state);
    axios
      .post('/challenges', {
        title: this.state.title,
        goal: this.state.goal,
        dailyTarget: {
          description: this.state.dailyTargetDescription,
          number: this.state.dailyTargetNumber,
          unit: this.state.dailyTargetUnit,
        },
        category: this.state.category,
        // owner: owner
        // private: false
      })
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          title: '',
          goal: '',
          dailyTargetDescription: '',
          dailyTargetNumber: '',
          dailyTargetUnit: '',
          category: '',
          // private: '',
        });
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      });
    // .catch(err => console.log(err))
  };

  render() {
    return (
      <>
      <div className="create-challenge-page">
        <form onSubmit={this.handleSubmit} className="create-challenge-form">
        <h1>Create a Challenge</h1>
        {/* <h3>Here you can make your own customized challenge</h3> */}
        <div className="create-challenge-form-item">
          <label htmlFor="title">Name your challenge: </label>
          <br/>
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
          <label htmlFor="goal">What do you want to accomplish with this challenge?</label>
          <br/>
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
          <br/>
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
          <label htmlFor="category">What category does your challenge fall into?</label>
          <br/>
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

          <button type="submit">Create Challenge</button>
        </form>
        </div>
      </>
    );
  }
}
