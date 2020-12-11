import React, { Component } from 'react';
import axios from 'axios';

export default class OneChallenge extends Component {
  
  state = {
    favorite: false,
    img: '/images/unfavorite.png'
  }

  toggleFavorite = () => {
    // change state
    this.setState((prevState) => ({ 
      favorite: !prevState.favorite
    }));
    // change image
    if (this.state.favorite) {
      this.setState({ img: "images/favorite.png" })
    } else {
      this.setState({ img: "images/unfavorite.png" })
    };
    // update database
    // const userID = ;
    const challengeID = this.props.challenge._id;
    console.log('Here', this.state.favorite)
    axios.put(`/users/${challengeID}/status`, {
      id: challengeID,
      status: 'favorite',
      favorite: this.state.favorite
    })
  }

  componentDidUpdate

  render() {
    // console.log(this.props)
    if (!this.state.img) return <div>Loading</div>
    return (
      // <div>
      //   {this.props.challenges.map(challenge => {
      //   return (
          <div className="card" key={ this.props.challenge._id }>
            <div className="card-header">
              <p>{ this.props.challenge.category }</p>
            </div>
            <div className="card-header">
              <h2>{ this.props.challenge.title }</h2>
              <p><strong>Goal:</strong> { this.props.challenge.goal }</p>
              <p><strong>Daily Target:</strong> { this.props.challenge.dailyTarget.description } { this.props.challenge.dailyTarget.number } { this.props.challenge.dailyTarget.unit }</p>
              {/* <button onClick={ this.toggleFavorite }> <img src={this.state.img} /></button> */}
              <img src={this.state.img} onClick={ this.toggleFavorite } alt="favorite" />
            </div>
          </div>
      //   )
      // })}
      // </div>
    )
  }
}