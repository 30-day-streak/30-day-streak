import React, { Component } from 'react';
import axios from 'axios';
import Filter from './filter/Filter.js';
import OneChallenge from './onechallenge/OneChallenge';

export default class Challenges extends Component {

  state = {
    challenges: [],
    search: '',
    category: '',
    favorite: false,
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

  setFilter = (name, value) => {
    this.setState({ [name]: value })
  }

  filter = (array) => {
    // work-in-progress - to help with only displaying the user specific favorites
    const favorite = this.props.user.challenges.filter(challenge => {
      return challenge.status === 'favorite'
    }).map(challenge => challenge.id)

    console.log(favorite)

    // create the filter
    return array.filter(challenge => { 
      return `${challenge.title}${challenge.goal}`.toLowerCase().includes(this.state.search.toLowerCase()) &&
      (this.state.category === challenge.category || !this.state.category) 
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    
    const filtered = this.filter(this.state.challenges)
    // console.log(filtered)
    console.log('props challenge page', this.props.user);

    const categories = this.state.challenges.map(challenge => { return challenge.category})
    .filter((category, index, array) => { return array.indexOf(category) === index })

    return (
      <div>
        <Filter 
          challenges={ this.state.challenges }
          user={ this.props.user}
          categories={ categories }
          setFilter={ this.setFilter }
        />
        {
          filtered.map(challenge => {
            return (
                <OneChallenge 
                  challenge={ challenge }
                  user={ this.props.user}
              />
            )
          })
        }
      </div>
    )
  }
}

