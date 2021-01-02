import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Filter from '../filter/Filter.js';
import OneChallenge from './OneChallenge';
import './Challenges.css';

export default class Challenges extends Component {

  state = {
    challenges: [],
    //filter
    searchFilter: '',
    categoryFilter: '',
    favoritesFilter: false,
  }

  getChallenges = () => {
    axios.get('/api/challenges')
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

  filter = () => {
    
    const favoriteIds = this.props.user.challenges.filter(challenge => {
      return challenge.status === 'favorite'
    }).map(challenge => challenge.id._id)

    const excludedIds = this.props.user.challenges.filter(challenge => {
      return challenge.status === 'active' || challenge.status === 'completed' || challenge.status === 'withdrawn'
    }).map(challenge => challenge.id._id)

    if (this.state.favoritesFilter) {
      return this.state.challenges.filter(challenge => {
        // only favorites
        return favoriteIds.includes(challenge._id) && 
        // search bar filter
        `${challenge.title}${challenge.goal}`.toLowerCase().includes(this.state.searchFilter.toLowerCase()) &&
        // categories filter
        (this.state.categoryFilter === challenge.category || !this.state.categoryFilter)
      })
    } else {
      return this.state.challenges.filter(challenge => {
        // search bar filter
        return `${challenge.title}${challenge.goal}`.toLowerCase().includes(this.state.searchFilter.toLowerCase()) &&
        // categories filter
        (this.state.categoryFilter === challenge.category || !this.state.categoryFilter) &&
        // exclude active, completed and withdrawn challenges
        !excludedIds.includes(challenge._id)
      })
    }
  }

  componentDidMount() {
    this.getChallenges();
  }

  render() {

    const filtered = this.filter();

    const categories = this.state.challenges.map(challenge => { return challenge.category })
    .filter((category, index, array) => { return array.indexOf(category) === index });
    
    return (
      <div>
        <div className="tool-bar">
          <Filter
            categories={ categories }
            setFilter={ this.setFilter }
          />
          <Link to="/challenges/create"><img src="/images/plus.png" /></Link>
        </div>
        <div className="challenges-container">
          {
            filtered.map(challenge => {
              return (
                <OneChallenge
                    challenge={ challenge }
                    user={ this.props.user }

                    getChallenges={ this.getChallenges }
                    filtered={ filtered }
                    setUser={this.props.setUser}
                  
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}