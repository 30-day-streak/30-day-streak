import React, { Component } from 'react';
import axios from 'axios';
// import Filter from './Filter';
import OneReward from './OneReward';

export default class Rewards extends Component {

  state = {
    rewards: []
  }

  getData = () => {
    axios.get('/rewards')
      .then(response => {
        console.log(response);
        this.setState({
          rewards: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log(this.state.challenges)
    return (
      <div>
        {/* <Filter /> */}
        {this.state.rewards.map(reward => {
        console.log('reward', reward)
        return (
        <OneReward 
          reward={this.state.reward} 
        />  
        )
      })}
        
      </div>
    )
  }
}