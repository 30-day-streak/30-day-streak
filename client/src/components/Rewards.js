import React, { Component } from 'react';
import axios from 'axios';
// import Filter from './Filter';
import OneReward from './OneReward';
import CreateReward from './CreateReward'

export default class Rewards extends Component {

  state = {
    rewards: []
  }

  getData = () => {
    axios.get('/rewards')
      .then(response => {
        this.setState({
          rewards: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  // updateList = () =>{
  //   this.forceUpdate()
  // }

  render() {
    const rewards = this.state.rewards
    return (
      <div>
        <CreateReward {...this.props} forceRewardListUpdate={this.getData}/>
        {rewards.map(reward => {
          return (
            <div key={reward._id}>
              <OneReward
                reward={reward}
                {...this.props}
              />
            </div>
          )
        })}

      </div>
    )
  }
}