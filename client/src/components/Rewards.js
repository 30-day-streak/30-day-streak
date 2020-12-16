import React, { Component } from 'react';
import axios from 'axios';
import Filter from './filter/Filter';
import OneReward from './OneReward';
import CreateReward from './CreateReward'

export default class Rewards extends Component {

  state = {
    rewards: [],
    //filter
    searchFilter: '',
    categoryFilter: '',
    favoritesFilter: false,
  }

  getData = () => {
    axios.get('/rewards')
      .then(response => {
        this.setState({
          rewards: response.data
        })
      })
      .catch(err => console.log(err))
  }

  setFilter = (name, value) => {
    this.setState({ [name]: value })
  }

  filter = () => {
    const favoriteIds = this.props.user.rewards.map(reward => reward._id)

    if (this.state.favoritesFilter) {
      return this.state.rewards.filter(reward => { 
        return favoriteIds.includes(reward._id)
      })
    } else {
      return this.state.rewards.filter(reward => { 
        // search bar filter
        return `${reward.name}${reward.description}`.toLowerCase().includes(this.state.searchFilter.toLowerCase()) &&
        // categories filter
        (this.state.categoryFilter === reward.category || !this.state.categoryFilter)
      })
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const filtered = this.filter();

    const categories = this.state.rewards.map(reward => { return reward.category})
    .filter((category, index, array) => { return array.indexOf(category) === index })

    return (
      <div>
        <Filter 
          categories={ categories }
          setFilter={ this.setFilter }
        />
        <CreateReward {...this.props} forceRewardListUpdate={this.getData}/>
        {filtered.map(reward => {
          return (
            <div key={reward._id}>
              <OneReward
                reward={ reward }
                user={ this.props.user}
                filtered={ filtered }
                getData={ this.getData }
                setUser={ this.props.setUser }
                toggleFavoriteReward = { this.props.toggleFavoriteReward }
              />
            </div>
          )
        })}

      </div>
    )
  }
}