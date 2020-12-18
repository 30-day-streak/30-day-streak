import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  // hideModal() {
  //   this.props.modalOff()
  // }

  render() {
    const showModalClassName = this.props.modalIsActive
      ? 'display-modal'
      : 'hide-modal';
    if (!this.props.modalIsActive) {
      return null;
    } else {
    }
    switch (this.props.event) {
      case '7':
      case '21':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h1> You've completed a {this.props.event}-day streak </h1>
              <h2>Congratulations!!</h2>
              <img
                src="./images/celebrationBaby.gif"
                alt="celebrating kid gif"
                width="150px"
              />
              <p>As a reward you can treat yourself to a</p>
              <h2>{this.props.reward.name}</h2>
              <p>{this.props.reward.description}</p>
              {/* <a href={this.props.reward.url} target="_blank" rel="noreferrer">Go to my reward</a> */}
              <br />
              <p>
                {' '}
                Enjoy your reward and think about what you have achieved - that
                will give you strength for the remainder of your challenge!
              </p>
              <br />
            </div>
          </div>
        );

      case '15':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h2>You're half way through your challenge!!</h2>
              <img
                src="./images/veryNice.gif"
                alt="celebrating kid gif"
                width="150px"
              />
              <h1>Well done for making it this far</h1>
              <p>Keep up the hard work!</p>
              <br />
              {/* <button onClick={this.props.modalOff}>CLOSE</button> */}
            </div>
          </div>
        );

      case '28':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h1>You're almost there</h1>
              <h2>
                There's only a couple of days left until the end of your
                challenge
              </h2>
              <img
                src="./images/youGotIt.gif"
                alt="celebrating kid gif"
                width="150px"
              />
              <p>You can be really proud of what you have achieved!</p>
              <br />
              {/* <button onClick={this.props.modalOff}>CLOSE</button> */}
            </div>
          </div>
        );

      case 'success':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h2>Well done, you completed your</h2>
              <h1>30-DAY STREAK!</h1>
              <p>You really deserve your grand prize:</p>
              {/* insert grand prize */}
              <img
                src="./images/elf.gif"
                alt="celebrating kid gif"
                height="130px"
              />
              <h2>Enjoy it and we look forward to seeing you again soon!</h2>
              <br />
              {/* <button onClick={this.props.modalOff}>CLOSE</button> */}
            </div>
          </div>
        );

      case 'notQuite':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h2>Well done for making it to the end of your challenge</h2>
              <h2>
                You didn't quite manage a 30-DAY-STREAK, but it was a great try!
              </h2>
              <img
                src="./images/veryNice.gif"
                alt="celebrating kid gif"
                width="150px"
              />
              <p>
                We are sure you've learned a lot for trying to maintain a habit
                for 30 days,
              </p>
              <p>so why not try this challenge again or find a new one</p>
              {/* put links in above line? */}
              <p>and have another try at 30-DAY-STREAK?</p>
              <br />
              {/* <button onClick={this.props.modalOff}>CLOSE</button> */}
            </div>
          </div>
        );

      case 'withdraw':
        return (
          <div className={showModalClassName}>
            <div className="modal-close-x">
              <img
                src="./images/Transparent_X.png"
                alt="close"
                width="30px"
                onClick={this.props.modalOff}
              />
            </div>
            <div className="modal-main">
              <h2>
                We are sorry to see that you are withdrawing from this
                challenge, but well done for giving it a try!
              </h2>
              <img src="./images/yoda.gif" alt="yoda gif" width="150px" />
              <p>
                We are sure you have learned a lot for trying to maintain a
                habit for 30 days,
              </p>
              <p>so why not try this challenge again or find a new one</p>
              {/* put links in above line? */}
              <p>and have another try at 30-DAY-STREAK?</p>
              <br />
              {/* <button onClick={this.props.modalOff}>CLOSE</button> */}
            </div>
          </div>
        );

      default:
        return null;
    }
  }
}
