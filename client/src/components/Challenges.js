import React, { Component } from 'react';
import axios from 'axios';
// import Filter from './Filter';
import OneChallenge from './OneChallenge';

export default class Challenges extends Component {

  state = {
    challenges: []
  }

  getData = () => {
    axios.get('/challenges')
      .then(response => {
        console.log(response);
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
    console.log(this.state.challenges)
    return (
      <div>
        {/* <Filter /> */}
        <OneChallenge 
          challenges={this.state.challenges} 
          getData={this.state.getData}
        />
      </div>
    )
  }
}

