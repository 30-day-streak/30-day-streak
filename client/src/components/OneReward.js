import React, { Component } from 'react';
import axios from 'axios';
import './challenges/Challenges.css';

export default class OneReward extends Component {

  state = {
    favorite: '',
  };

  toggleFavorite = () => {
    const newFavorite = !this.state.favorite

    // 1. via Apps.js
    // this.props.toggleFavoriteReward(this.props.reward._id, newFavorite);

    // 2. the way it's done with challenges / different route
    const rewardID = this.props.reward._id;
    axios.put(`/api/users/${rewardID}/rewardsfavorite`, {
      favorite: newFavorite,
    })

    // 3. toggleFavoriteReward but moved from App.js
    // const updatedUser = this.props.user;
    // console.log('newFavorite', newFavorite)
    // console.log('user', updatedUser.rewards)
    // if (newFavorite) updatedUser.rewards.push(this.props.reward._id);
    // else {
    //   updatedUser.rewards = updatedUser.rewards.filter(profileRewardId => {
    //     console.log(profileRewardId._id, this.props.reward._id, profileRewardId._id !== this.props.reward._id)
    //     return profileRewardId._id !== this.props.reward._id
    //   });
    //   console.log('updated user', updatedUser.rewards)
    //   // updatedUser.rewards.pop(this.props.reward._id);
    // }
    // this.props.setUser(updatedUser);
    // axios.put(`/users/${updatedUser._id}`, {
    //   rewards: updatedUser.rewards
    // })

    //update state
    this.setState({ favorite: newFavorite });
    
    // refresh data
    this.props.getData()
  }

  initialSetUp = () => {
    const foundInUserFavorites = this.props.user.rewards.some(reward => {
      return reward._id === this.props.reward._id;
    })

    this.setState({
      favorite: foundInUserFavorites
    })
  }

  componentDidMount() {
    this.initialSetUp();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered.length !== this.props.filtered.length) {
      this.initialSetUp()
    }
  }

  render() {
    return (
      <div className="card" key={this.props.reward._id}>
        <div className="card-header">
          <p>{ this.props.reward.category }</p>
          <img src={ this.state.favorite ? './images/favorite1.png' : './images/unfavorite1.png'} onClick={this.toggleFavorite} alt="favorite" />
        </div>
        <h3>{ this.props.reward.name }</h3>
        <hr/>
        <p>{ this.props.reward.description && this.props.reward.description }</p>
  
        { this.props.reward.url && <a href="{this.props.reward.url}">Link</a>}
      </div>
    )
  }
}