import React, { Component } from 'react';
import axios from 'axios';
// import Filter from './Filter';
import OneReward from './OneReward';
import CreateReward from './CreateReward'
import Filter from './filter/Filter';

export default class Rewards extends Component {

  state = {
    rewards: [],
    searchFilter: '',
    categoryFilter: '',
    favouritesFilter: false
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
    console.log(`set filter`, name, value);

    this.setState({ [name]: value })
    console.log(`state`, this.state);

  }

  filter = () => {
    const favouriteIds = this.props.user.rewards.map(reward => reward._id)

    console.log({ favouriteIds });
    console.log(`this.state.rewards`, this.state.rewards);

    if (this.state.favouritesFilter) {
      // console.log(` fav filter true `, this.state.favouritesFilter);
      return this.state.rewards.filter(reward => {
        console.log(`filter yes,`, reward)
        // if (favouriteIds.includes(reward._id)) console.log(`includes`);

        return favouriteIds.includes(reward._id)
      })
    } else {
      console.log(` fav filter false `, this.state.categoryFilter);
      return this.state.rewards.filter(reward => {
        // console.log(`filter no,`, reward)
        console.log(`cat filter`, this.state.categoryFilter, reward.category, this.state.categoryFilter === reward.category);
        

        return `${reward.name} ${reward.description}`.toLowerCase().includes(this.state.searchFilter.toLowerCase()) &&
          (this.state.categoryFilter === reward.category || !this.state.CategoryFilter)
      })
    }
  }

  componentDidMount() {
    this.getData();
    console.log(`props`, this.props);

  }

  // updateList = () =>{
  //   this.forceUpdate()
  // }

  render() {
    const filtered = this.filter();

    const categories = this.state.rewards.map(reward => { return reward.category }).filter((category, index, array) => { return array.indexOf(category) === index })

    const rewards = this.state.rewards
    return (
      <div>
        <Filter
          rewards={this.state.rewards}
          user={this.props.user}
          categories={categories}
          setFilter={this.setFilter}
        />

        <CreateReward {...this.props} forceRewardListUpdate={this.getData} />
        {
          filtered.map(reward => {
            return (
              <div key={reward._id}>
                <OneReward
                  reward={reward}
                  {...this.props}
                />
              </div>
            )
          })
        }

      </div >
    )
  }
}