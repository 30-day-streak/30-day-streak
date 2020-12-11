import React from 'react';
import axios from 'axios';

export default function ProjectList(props) {
  return (
    <div>
      {props.challenges.map(challenge => {
        console.log('challenge', challenge)
        return (
          <div className="card" key={ challenge._id }>
            <div className="card-header">
              <p>{ challenge.category }</p>
            </div>
            <h2>{ challenge.title }</h2>
            <p><strong>Goal:</strong> { challenge.goal }</p>
            <p><strong>Dailt Target:</strong> { challenge.dailyTarget.description } { challenge.dailyTarget.number } { challenge.dailyTarget.unit }</p>
          </div>
        )
      })}
    </div>
  )
}