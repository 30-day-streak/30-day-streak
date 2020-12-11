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
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
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
        // category: this.state.category,
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
          // category: '',
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor="goal">Goal</label>
          <input
            type="text"
            id="goal"
            name="goal"
            value={this.state.goal}
            onChange={this.handleChange}
          />
          <label htmlFor="dailyTargetDescription">Daily Target Description</label>
          <input
            type="text"
            id="dailyTargetDescription"
            name="dailyTargetDescription"
            value={this.state.dailyTargetDescription}
            onChange={this.handleChange}
          />
          <label htmlFor="dailyTargetNumber">Daily Target Number</label>
          <input
            type="number"
            id="dailyTargetNumber"
            name="dailyTargetNumber"
            value={this.state.dailyTargetNumber}
            onChange={this.handleChange}
          />
          <label htmlFor="dailyTargetUnit">Daily Target Unit</label>
          <input
            type="text"
            id="dailyTargetUnit"
            name="dailyTargetUnit"
            value={this.state.dailyTargetUnit}
            onChange={this.handleChange}
          />
          <button type="submit">Add a Project</button>
        </form>
      </>
    );
  }
}
