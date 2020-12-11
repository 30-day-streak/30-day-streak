import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/navbar/Navbar';
import CreateReward from "./components/CreateReward";


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
          </Switch>
          <CreateReward />
        </div>

    );
  }

}

export default App;
