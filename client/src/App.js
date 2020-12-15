import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import CreateReward from "./components/CreateReward";
import Navbar from './components/navbar/Navbar';
import Challenges from './components/Challenges';
import CreateChallenge from './components/CreateChallenge';
import StartChallenge from './components/StartChallenge'
import Rewards from './components/Rewards';
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

  render() {
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
            render={props => <Dashboard user={this.state.user} {...props} />}
          />
          <Route
            exact
            path='/challenges'
            render={props => {
            if (this.state.user) return <Challenges user={this.state.user} {...props} />
            else return <Redirect to='/' />
            }}
          />
          <Route
            exact
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} />}
          />
          <Route 
            exact
            path='/challenges/:id/start'
            render={props => <StartChallenge setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/CreateReward"
            render={props => <CreateReward setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path='/rewards'
            render={props => <Rewards setUser={this.setUser} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
