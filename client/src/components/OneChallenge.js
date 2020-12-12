import React, { Component } from 'react';
import axios from 'axios';

export default class OneChallenge extends Component {

  state = {
    favorite: false,
    img: '/images/unfavorite.png',
  }

  // getData = () => {
    // console.log(this.props.user.match.params);
    // axios.get(`/users/${this.props.user}`, { id: this.user })
    //   .then(user => {

    //     console.log(user.data)
    //     // this.setState({
    //     //   favorite: response.data
    //     // })
    //   })
    //   .catch(err => console.log(err))
  // }

  // componentDidMount() {
  //   this.getData();
  // }

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
    const challengeID = this.props.challenge._id;
    axios.put(`/users/${challengeID}/status`, {
      id: challengeID,
      status: 'favorite',
      favorite: this.state.favorite
    })
  }

  // setFavorite = () => {
  //   this.props.challenge._id ==
  // }

  // componentDidMount() {
  //   this.setFavorite()
  // }

  render() {
    console.log(this.props.user);
    return (
          <div className="card" key={ this.props.challenge._id }>
            <div className="card-header">
              <p>{ this.props.challenge.category }</p>
            </div>
            <div className="card-header">
              <h2>{ this.props.challenge.title }</h2>
              <p><strong>Goal:</strong> { this.props.challenge.goal }</p>
              <p><strong>Daily Target:</strong> { this.props.challenge.dailyTarget.description } { this.props.challenge.dailyTarget.number } { this.props.challenge.dailyTarget.unit }</p>
              <img src={this.state.img} onClick={ this.toggleFavorite } alt="favorite" />
            </div>
          </div>
    )
  }
}