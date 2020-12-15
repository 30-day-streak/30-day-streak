import React, { Component } from 'react'
// import axios from 'axios';

export default class OneReward extends Component {
  state = {
    favourite: false
  };

  toggleFavorite = () => {
    console.log(this.state.favourite);

    const newFavourite = !this.state.favourite
    console.log({ newFavourite });

    this.props.toggleFavouriteReward(this.props.reward._id, newFavourite);
    this.setState({ favourite: newFavourite });
    // this.forceUpdate()
  }

  initialSetUp = () => {
    // console.log(`props`, this.props);
    const foundInUserFavourites = this.props.user.rewards.some(reward => {
      return reward === this.props.reward._id;
    })
    // console.log({foundInUserFavourites});

    this.setState({
      favourite: foundInUserFavourites
    })
  }

  componentDidMount() {
    this.initialSetUp();
    // console.log(this.props);

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