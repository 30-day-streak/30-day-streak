import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Filter from './filter/Filter';
import OneReward from './OneReward';
import './challenges/Challenges.css';
// import CreateReward from './CreateReward';

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
        console.log({ response });

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
    console.log(`props`, this.props);

  }

  render() {
    const filtered = this.filter();

    const categories = this.state.rewards.map(reward => { return reward.category})
    .filter((category, index, array) => { return array.indexOf(category) === index })

    return (
      <div>
        <div className="tool-bar">
          <Filter 
            // challenges={ this.state.challenges }
            // user={ this.props.user}
            categories={ categories }
            setFilter={ this.setFilter }
          />
          <Link to="/rewards/create"><img src="/images/plus.png" /></Link>
        </div>
        
        {/* <CreateReward {...this.props} forceRewardListUpdate={this.getData}/> */}

        {filtered.map(reward => {
          return (
            <div key={reward._id}>
              <OneReward
                reward={ reward }
                user={ this.props.user}
                filtered={ filtered }
                getData={ this.getData }
                // setUser={ this.props.setUser }
                // toggleFavoriteReward = { this.props.toggleFavoriteReward }
              />
            </div>
          )
        })}
      </div>
    )
  }
}