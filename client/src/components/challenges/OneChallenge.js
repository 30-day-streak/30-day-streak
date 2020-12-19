import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Challenges.css';

export default class OneChallenge extends Component {
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
      // change state
      this.setState({ favorite: newFavorite });
      // update database
      const challengeID = this.props.challenge._id;
      const updatedUser = await axios.put(`/api/users/${challengeID}/challengesfavorite`, {
        favorite: newFavorite,
      });
      this.props.setUser(updatedUser.data)
      // console.log('updated user data after favorite from axios', updatedUser.data);
      // console.log('state .user.challenges', this.props.user.challenges);
      //refresh displayed information
      this.props.getChallenges();
    } catch (error) {
      console.log(error);
    }
  };

  initialSetUp = () => {
    //find instead of some?
    // console.log(this.props.user.challenges)
    const foundInUserFavorites = this.props.user.challenges.some(
      (challenge) => {
        return (
          challenge.id._id === this.props.challenge._id &&
          challenge.status === 'favorite'
        );
      }
    );

    this.setState({
      favorite: foundInUserFavorites,
    });
  };

  componentDidMount() {
    this.initialSetUp();
    this.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered.length !== this.props.filtered.length) {
      this.initialSetUp();
    }
  }

  render() {
    let participantCounter = 0
    this.state.users.forEach(user => {
      user.challenges.forEach(challenge => {
        if (challenge.id === this.props.challenge._id && 
          (challenge.status === 'completed' || challenge.status === 'active' || challenge.status === 'withdrawn')) {
          participantCounter++
        }
      })
    })

    return (
      <div className="card" key={this.props.challenge._id}>
        <div className="card-header">
          <span>{this.props.challenge.category}</span>
          <img
            src={
              this.state.favorite
                ? './images/favorite1.png'
                : './images/unfavorite1.png'
            }
            onClick={this.toggleFavorite}
            alt="favorite"
          />
        </div>
        <h3>{this.props.challenge.title}</h3>
        <hr />
        <p>{this.props.challenge.goal && this.props.challenge.goal}</p>
        <Link to={`/challenges/${this.props.challenge._id}/start`}>
          <button className="button-light">Start</button>
        </Link>
      </div>
    );
  }
}
