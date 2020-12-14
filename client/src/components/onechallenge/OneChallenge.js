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
      // <div class="container center">
        <div class="card">
          <h2>{ this.props.challenge.title }</h2>
          <hr/>
          <p>{ this.props.challenge.goal }</p>
          <img src={this.state.favorite ? '/images/favorite.png' : '/images/unfavorite.png'} style={{width: "50px"}} onClick={ this.toggleFavorite } alt="favorite" />
        </div>
      // </div>
    )
  }
}


