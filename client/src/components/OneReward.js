import React, { Component } from 'react'
// import axios from 'axios';

export default class OneReward extends Component {
  state = {
    favorite: false
  };

  toggleFavorite = () => {
    const newFavorite = !this.state.favorite

    this.props.toggleFavoriteReward(this.props.reward._id, newFavorite);
    this.setState({ favorite: newFavorite });
  }

  initialSetUp = () => {
    const foundInUserFavorites = this.props.user.rewards.some(reward => {
      return reward === this.props.reward._id;
    })

    this.setState({
      favorite: foundInUserFavorites
    })
  }

  componentDidMount() {
    this.initialSetUp();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered !== this.props.filtered) {
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