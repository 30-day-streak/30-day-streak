import React, { Component } from 'react'

export default class Modal extends Component {
  render() {
    const showModalClassName = this.props.modalIsActive ? "modal display-modal" : "modal hide-modal"

    return (
      <div className={showModalClassName}>
        <div className="modal-main">
          <h1> Modal test </h1>
          
        </div>
      </div>
    )
  }
}
