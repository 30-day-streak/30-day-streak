import React, { Component } from 'react'
import axios from 'axios';

export default function OneReward(props) {
  return (
    <div>
      {props.rewards.map(reward => {
        console.log('reward', reward)
        return (
          <div className="card" key={ reward._id }>
            <div className="card-header">
              <p>{ reward.category }</p>
            </div>
            <h2>{ reward.title }</h2>
            <p><strong>Goal:</strong> { reward.goal }</p>
            <p><strong>Dailt Target:</strong> { reward.dailyTarget.description } { reward.dailyTarget.number } { reward.dailyTarget.unit }</p>
          </div>
        )
      })}
    </div>
  )
}