import React, { Component } from 'react'
import axios from 'axios';

export default class OneReward extends Component {
  state = {
    favorite: false
  };

  toggleFavorite = () => {
    const newFavorite = !this.state.favorite

    // 1. via Apps.js
    // this.props.toggleFavoriteReward(this.props.reward._id, newFavorite);

    // 2. the way it's done with challenges / different route
    const rewardID = this.props.reward._id;
    axios.put(`/users/${rewardID}/rewardsfavorite`, {
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
    console.log('refresh')
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
    console.log('this', this.state.favorite, 'prev', prevState.favorite, prevState.favorite !== this.state.favorite)
    if (prevProps.filtered.length !== this.props.filtered.length) {
      console.log('toggle')
      this.initialSetUp()
    }
  }

  render() {
    return (
      <form className="card" key={this.props.reward._id}>
        <div className="card-header">
          <p>{this.props.reward._id}</p>
          <h2>{this.props.reward.name}</h2>
        </div>
        { this.props.reward.description && <p>{this.props.reward.description}</p>}
        <p>{this.props.reward.category}</p>
        { this.props.reward.url && <a href="{this.props.reward.url}">Link</a>}
        <img src={this.state.favorite ? '/images/favorite.png' : '/images/unfavorite.png'} style={{ width: "50px" }} onClick={this.toggleFavorite} alt="favorite" />
      </form>
    )
  }
}