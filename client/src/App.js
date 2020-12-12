import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Challenges from './components/Challenges';
import CreateChallenge from './components/CreateChallenge';


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
    console.log('SU', this.state.user, 'PU', this.props.user)
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
            path='/challenges'
            render={props => {
            if (this.state.user) return <Challenges {...props} />
            else return <Redirect to='/' />
            }}
          />
          <Route
            exact
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} />}
          />
        </Switch>
      </div>
    );
  }
  
}

export default App;
