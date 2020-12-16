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
    // if (newFavorite) updatedUser.rewards.push(this.props.reward._id);
    // else {
    //   updatedUser.rewards.pop(this.props.reward._id);
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
    if (prevProps.filtered.length != this.props.filtered.length) {
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