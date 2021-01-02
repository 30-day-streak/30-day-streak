import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/navbar/Navbar';
import Challenges from './components/challenges/Challenges';
import CreateChallenge from './components/challenges/CreateChallenge';
import StartChallenge from './components/challenges/StartChallenge'
import Rewards from './components/rewards/Rewards';
import CreateReward from "./components/rewards/CreateReward";
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Modal from './components/modal/Modal';

class App extends Component {

  state = {
    user: this.props.user,
    modalIsActive: false,
    modalEvent: "",
    modalReward: {},
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  modalOff = () => {
    this.setState({
      modalIsActive: false,
      modalEvent: "",
      modalReward: {}
    })
  }

  notifyMilestone = (notification) => {
    const milestone = notification[0];
    const reward = notification[1];
    const challengeId = notification[2]
    const changedToggle = notification[3]

    this.setState({
      modalIsActive: true,
      modalEvent: milestone,
      modalReward: reward
    })
  }


  render() {
    return (
      <div className="App">

        <Navbar user={this.state.user} setUser={this.setUser} />

        { this.state.modalIsActive && <div className="modal">
          <Modal
            modalIsActive={this.state.modalIsActive}
            modalOff={this.modalOff}
            event={this.state.modalEvent}
            reward={this.state.modalReward}
          />
        </div>
        }

        < Switch >
          <Route
            exact path='/signup'
            render={props => <SignUp setUser={this.setUser} {...props} />}
          />
          <Route
            exact path='/login'
            render={props => <Login setUser={this.setUser} {...props} />}
          />
          <Route
            exact path='/'
            render={props => <Dashboard
              notifyMilestone={this.notifyMilestone}
              setUser={this.setUser}
              user={this.state.user} {...props} />}
          />
          <Route
            exact path='/challenges'
            render={props => <Challenges user={this.state.user} setUser={this.setUser} {...props} />}
          />
          <Route
            exact path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} user={this.state.user} />}
          />
          <Route
            exact path="/rewards/create"
            render={props => <CreateReward setUser={this.setUser} {...props} />}
          />
          <Route
            exact path='/rewards'
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
            exact path='/challenges/:id/start'
            render={props => <StartChallenge setUser={this.setUser} {...props} user={this.state.user} />}
          />
          <Route
            exact path='/profile'
            render={props => <Profile setUser={this.setUser} {...props} user={this.state.user} />}
          />

        </Switch >

      </div >
    );
  }
}


export default App;