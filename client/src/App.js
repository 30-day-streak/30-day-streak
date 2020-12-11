import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
<<<<<<< HEAD
            path='/challenges'
            render={props => <Challenges setUser={this.setUser} {...props} />}
=======
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} />}
>>>>>>> fd0fa382852f4a875d1b9fb3057f6e0040d1c5d3
          />
        </Switch>
      </div>
    );
  }
  
}

export default App;
