import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Filter from './filter/Filter.js';
import OneChallenge from './onechallenge/OneChallenge';

export default class Challenges extends Component {

  state = {
    //challenges
    challenges: [],
    search: '',
    category: '',

    //user
    filterFavorites: false,
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

  // filterFavorites

  filter = () => {
    // to help with only displaying the user specific favorites
    if (this.state.filterFavorites) {
      const favoriteIds = this.props.user.challenges.filter(challenge => {
        return challenge.status === 'favorite'
      }).map(challenge => challenge.id)

      return this.state.challenges.filter(challenge => { 
        console.log(favoriteIds, challenge._id, favoriteIds.includes(challenge.id))
        return favoriteIds.includes(challenge._id)
      })
    } else {

      const excludedIds = this.props.user.challenges.filter(challenge => {
        return challenge.status === 'active' || challenge.status === 'completed' || challenge.status === 'withdrawn'
      }).map(challenge => challenge.id)

      return this.state.challenges.filter(challenge => { 
        //search bar
        return `${challenge.title}${challenge.goal}`.toLowerCase().includes(this.state.search.toLowerCase()) &&
        //categories filter
        (this.state.category === challenge.category || !this.state.category) &&
        //exclude active, completed and withdrawn challenges
        !excludedIds.includes(challenge.id)
      })
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const filtered = this.filter()
    // console.log('filtered',filtered)

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
        <Link to="/challenges/create"><button>Create a challenge</button></Link>
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

