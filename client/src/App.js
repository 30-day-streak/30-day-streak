import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Challenges from './components/Challenges';
import CreateChallenge from './components/CreateChallenge';
import StartChallenge from './components/StartChallenge'

class App extends Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render(){
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
            render={props => <Challenges setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} />}
          />
          <Route 
          exact
          // path='/challenges/:id/start'
          path='/challenges/start'
          render={props => <StartChallenge setUser={this.setUser} {...props} />}
          />
        </Switch>
      </div>
    );
  }
  
}

export default App;
