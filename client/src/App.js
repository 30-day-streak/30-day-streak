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
<<<<<<< HEAD
import Profile from './components/Profile'
=======
import Notifications from './components/Notifications';
>>>>>>> main

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
    console.log(`milestone notified:`, notification);

    const milestone = notification[0];
    const reward = notification[1];
    const challengeId = notification[2]
    const changedToggle = notification[3]
    console.log({ milestone }, { reward }, { changedToggle })
    this.setState({
      modalIsActive: true,
      modalEvent: milestone,
      modalReward: reward
    })


    const userChallenges = this.props.user.challenges.map(challenge => {
      console.log(challenge[changedToggle]);

      //   if (challenge.id == challengeId){
      //     challenge[changedToggle] = false
      //   }
      // })
      // console.log(userChallenges);

      // const updatedUser = await axios.put(`api/users/${this.state.user._id}`), {
      //   challenges: this.state.user.challenges,
      // })
    });
    return null;
  }

<<<<<<< HEAD



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

=======
>>>>>>> main
  render() {
    return (
      <div className="App" >

        <Navbar user={this.state.user} setUser={this.setUser} />

<<<<<<< HEAD
        { this.state.modalIsActive && <div className="modal">
          <Modal
            modalIsActive={this.state.modalIsActive}
            modalOff={this.modalOff}
            event={this.state.modalEvent}
            reward={this.state.modalReward}
          />
        </div>
        }
=======
        {/* <Modal
          modalIsActive={this.state.modalIsActive}
          event={this.state.modalEvent}
          reward={this.state.modalReward}
        /> */}
>>>>>>> main

        < Switch >
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
            render={props => <Dashboard
              notifyMilestone={this.notifyMilestone}
              setUser={this.setUser}
              user={this.state.user} {...props} />}
          />
          <Route
            exact
            path='/challenges'
            render={props => <Challenges user={this.state.user} setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path='/challenges/create'
            render={props => <CreateChallenge setUser={this.setUser} {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/rewards/create"
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
            render={props => <StartChallenge setUser={this.setUser} {...props} user={this.state.user} />}
          />

          <Route
            exact
            path='/profile'
            render={props => <Profile setUser={this.setUser} {...props} user={this.state.user} />}
          />

        </Switch >

      </div >
    );
  }
}


export default App;