import React, { Component } from 'react';
import axios from 'axios';
import './Challenges.css';
import {Link} from 'react-router-dom';
import './Challenges.css';

export default class OneChallenge extends Component {

  state = {
    favorite: '',
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
    this.props.getData()
  }

  initialSetUp = () => {

    //find instead of some?
    const foundInUserFavorites = this.props.user.challenges.some(challenge => {
      return challenge.id._id === this.props.challenge._id && challenge.status === 'favorite'
    })

    this.setState({ 
      favorite: foundInUserFavorites,
    })
  }

  componentDidMount() {
    this.initialSetUp()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered !== this.props.filtered) {
      this.initialSetUp()
    }
  }

  render() {
    // console.log(this.state)
    return (
      <>
      {/* <div class="container center"> */}
        <div className="card" key={ this.props.challenge._id }>
          <div className='card-header'>
            <p>{ this.props.challenge.category }</p>
            <img src={this.state.favorite ? '/images/favorite.png' : '/images/unfavorite.png'} onClick={ this.toggleFavorite } alt="favorite" />
          </div>
          <h3>{ this.props.challenge.title }</h3>
          <hr/>
          <p>{ this.props.challenge.goal }</p>
          <Link to={`/challenges/${this.props.challenge._id}/start`}><button>Start</button></Link>
        </div>
      {/* </div> */}
    </>
    )
  }
}


