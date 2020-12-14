import React, { Component } from 'react';
import axios from 'axios';
import './OneChallenge.css';

export default class OneChallenge extends Component {

  state = {
    category: '',
    favorite: false,
  }

  toggleFavorite = () => {
    const newFavorite = !this.state.favorite;
    // change state
    this.setState({ 
      favorite: newFavorite
    });
    // update database
    const challengeID = this.props.challenge._id;
    axios.put(`/users/${challengeID}/status`, {
      favorite: newFavorite
    })
  }

  initialSetUp = () => {
    const foundInUserFavorites = this.props.user.challenges.some(challenge => {
      return challenge.id === this.props.challenge._id;
    })

    this.setState({ 
      favorite: foundInUserFavorites,
    })
  }

  componentDidMount() {
    this.initialSetUp()
  }

  render() {
    return (
      <div className="card" key={ this.props.challenge._id }>
        <div className="card-header">
          <p>{ this.props.challenge.category }</p>
        </div>
        <div className="card-title">
          <h2>{ this.props.challenge.title }</h2>
          <p><strong>Goal:</strong> { this.props.challenge.goal }</p>
          <p><strong>Daily Target:</strong> { this.props.challenge.dailyTarget.description } { this.props.challenge.dailyTarget.number } { this.props.challenge.dailyTarget.unit }</p>
          <img src={this.state.favorite ? '/images/favorite.png' : '/images/unfavorite.png'} onClick={ this.toggleFavorite } alt="favorite" />
        </div>
      </div>
    )
  }
}