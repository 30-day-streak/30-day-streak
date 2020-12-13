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
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // DO NOT DELETE :)
  // WAITING ON OTHER COMPONENTS TO UNCOMMENT
  // activate this when the get challenges by ID route is up and running
  // getData = () => {
  //   const id = this.props.match.params.challengeID;
  //   axios
  //     .get(`/challenges/${challengeID}`)
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({
  //         title: response.data.title,
  //         goal: response.data.goal,
  //         dailyTargetDescription: response.data.dailyTarget.description,
  //         dailyTargetNumber: response.data.dailyTarget.number,
  //         dailyTargetUnit: response.data.dailyTarget.number,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('error', err);
  //     });
  // };

  // activate this with get data
  // componentDidMount = () => {
  //   this.getData();
  // };

  // handleSubmit = (event) => {
  //   // event.preventDefault();
  //   // check here in the props that they are named the same from the route
  //   const id = this.props.match.params.challengeID
  //   axios
  //  // maybe post here?
  //     .put(`/users/${id}/start`, {
  //       prize: this.state.prize
  //     })
  //     .then(res.redirect('/'))
  // }

  test = () => {
    console.log('test button clicked');
    axios
    .put('/users/test')
  }

  render() {
    return (
      <div>
        <h2>
          Congratulations! Here is the information for the CHALLENGE you're
          starting TODAY!
        </h2>
        <h3>{this.state.title}</h3>
        <p>Goal: {this.state.goal}</p>
        <p>
          Daily target: {this.state.dailyTargetDescription}
          {this.state.dailyTargetUnit} {this.state.dailyTargetNumber}
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
          <button onClick={this.test}>Let's do it!</button>
        </form>
      </div>
    );
  }
}
