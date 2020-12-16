import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import CreateReward from "./components/CreateReward";
import Navbar from './components/navbar/Navbar';
import Challenges from './components/challenges/Challenges';
import CreateChallenge from './components/CreateChallenge';
import StartChallenge from './components/StartChallenge'
import Rewards from './components/Rewards';
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard';


class App extends Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  // toggleFavoriteReward = (rewardId, favStatus) => {
  //   console.log(`toggling`, rewardId, favStatus);
  //   const updatedUser = this.state.user
  //   if (favStatus) {
  //     updatedUser.rewards.push(rewardId);
  //     console.log(`updated user rewards`, updatedUser.rewards);
  //   } else {
  //     updatedUser.rewards = updatedUser.rewards.filter(profileRewardId => {
  //       console.log({ profileRewardId }, { rewardId })
  //       return profileRewardId !== rewardId
  //     });
  //     console.log(`updated user rewards`, updatedUser.rewards);
  //   }
  //   this.setState({
  //     user: updatedUser
  //   })
  //   axios.put(`/users/${updatedUser._id}`, {
  //     challenges: updatedUser.challenges,
  //     rewards: updatedUser.rewards
  //   })
  // }

  render() {
    console.log('user from app page', this.props.user);
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path='/signup'
            render={props => <SignUp setUser={this.setUser} {...props} />}
          />
      
          <Route
            exact
            path='/login'
            render={props => <Login setUser={this.setUser} {...props} />}
          />
      
          <Route
            exact
            path='/'
            render={props => <Dashboard setUser={this.setUser} user={this.props.user} {...props} />}
          />
          <Route
            exact
            path='/challenges'
            render={props => {
              if (this.state.user) return <Challenges {...props} user={this.state.user} />
              else return <Redirect to='/' />
            }}
          />
          <Route
            exact
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} user={this.props.user}/>}
          />
          <Route
            exact
            path="/CreateReward"
            render={props => <CreateReward setUser={this.setUser} {...props} />}
          />
        <Route
          exact
          path='/rewards'
          render={props => {
            if (this.state.user) return (
            <Rewards
              {...props}
              user={this.state.user}
              setUser={this.setUser}
              // toggleFavoriteReward={this.toggleFavoriteReward}
            />)
            else return (<Redirect to='/' />)
          }}
        />
          <Route 
            exact
            path='/challenges/:id/start'
            render={props => <StartChallenge setUser={this.setUser} {...props} user={this.props.user}/>}
          />

      </Switch>
      </div>
    );
  }
}

export default App;