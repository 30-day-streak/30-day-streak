import React, { Component } from 'react';
import axios from 'axios';
import '../challenges/Challenges.css';

export default class OneReward extends Component {
  state = {
    users: [],
    favorite: '',
  };

  getUsers = () => {
    axios.get('/api/users')
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(err => console.log(err))
  }

  toggleFavorite = async () => {
    try {
      const newFavorite = !this.state.favorite;

      this.setState({ favorite: newFavorite });
      const rewardID = this.props.reward._id;

      //update state
      const updatedUser = await axios.put(
        `/api/users/${rewardID}/rewardsfavorite`,
        {
          favorite: newFavorite,
        }
      );
      this.props.setUser(updatedUser.data)
      // refresh data
      this.props.getRewards();
    } catch (error) {
      console.log(error);
    }
  };

  initialSetUp = () => {
    const foundInUserFavorites = this.props.user.rewards.some((reward) => {
      return reward._id === this.props.reward._id;
    });

    this.setState({
      favorite: foundInUserFavorites,
    });
  };

  componentDidMount() {
    this.initialSetUp();
    this.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered !== this.props.filtered) {
      this.initialSetUp();
    }
    this.getUsers();
  }

  render() {

    let rewardFavoriteCounter = 0
    this.state.users.forEach(user => {
      user.rewards.forEach(reward => {
        if (reward === this.props.reward._id) {
          rewardFavoriteCounter++
        }
      })
    })

    return (
      <div className="card" key={this.props.reward._id}>
        <div className="card-header">
          <span>{this.props.reward.category}</span>
          <div className="favorites">
            <img
              src={
                this.state.favorite
                  ? './images/favorite1.png'
                  : './images/unfavorite1.png'
              }
              onClick={this.toggleFavorite}
              alt="favorite"
            /> &nbsp; 
            <span>({rewardFavoriteCounter})</span>
          </div>
        </div>
        <h3>{this.props.reward.name && this.props.reward.name}</h3>
        {this.props.reward.description && <hr /> }
        <p>{this.props.reward.description && this.props.reward.description}</p>
        {this.props.reward.url && <a href="{this.props.reward.url}">Link</a>}
      </div>
    );
  }
}
