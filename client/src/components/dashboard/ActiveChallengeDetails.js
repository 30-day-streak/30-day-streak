import React, { Component } from 'react'
import FullTracker from './FullTracker'

export default class ActiveChallengeDetails extends Component {
  


    render() {
    
    
    return (
      <div className="activeContainer">
        <FullTracker user={this.props.user}/>
      </div>
    )
  }
}
