import React, { Component } from 'react';
import axios from 'axios';
// import Filter from './Filter';
import OneChallenge from './OneChallenge';

export default class Challenges extends Component {

  state = {
    challenges: [],
  }

  getData = () => {
    axios.get('/challenges')
      .then(response => {
        this.setState({
          challenges: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log('USER',this.props.user)
    return (
      <div>
        {
          this.state.challenges.map(challenge => {
            return (
              <OneChallenge 
                challenge={challenge}
                user={this.props.user}
              />
            )
          })
        }
      </div>
    )
  }
}

