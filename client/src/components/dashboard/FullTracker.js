import React, { Component } from 'react';
import axios from 'axios';
import './FullTracker.css';
import TrackerButton from './TrackerButton'

export default class FullTracker extends Component {
  state = {
    user: '',
  };

  initialSetupTracker = () => {
    let tracker = this.props.challenge.tracker;
    for (let i = 0; i < tracker.length; i++) {
      let indexToString = i.toString();
      let trackerValue = tracker[i];
      this.setState({
        [indexToString]: trackerValue,
      });
    }
  };

  handleChange = async (event) => {
    try {
      const target = event.target;
      const value = target.checked;
      const name = target.id;
      // console.log('user tracker array', this.state.user.challenges[0].tracker);
      let challengeTracker = this.props.challenge.tracker;
      let index = target.id;
      if (challengeTracker[index] === 0) {
        challengeTracker[index]++;
      } else if (challengeTracker[index] === 1) {
        challengeTracker[index]++;
      } else {
        challengeTracker[index]--;
      }
      // console.log('challenge tracker after click', challengeTracker);
      // console.log('state after click', this.state);
      this.setState({
        [name]: value,
      });
      let userId = this.state.user._id;
      const updatedUser = await axios.put(`/users/${userId}`, {
        challenges: this.state.user.challenges,
        rewards: this.state.user.rewards,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
    });
    this.initialSetupTracker();
  };

  render() {
    // if(!this.props.challenge.id.title) {
    //   window.location.reload();
    // } else {
      // console.log('props from tracker render', this.props.challenge);
      // console.log('props from full tracker page', this.props);
      // const activeChallenge =
      let challengeTracker = this.props.challenge.tracker;
      return (
        <div className="full-tracker">
        <div>tracker</div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="0" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="1" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="2" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="3" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="4" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="5" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="6" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="7" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="8" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="9" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="10" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="11" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="12" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="13" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="14" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="15" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="16" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="17" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="18" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="19" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="20" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="21" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="22" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="23" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="24" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>

        <div className="set-of-five-checkboxes">
        <TrackerButton index="25" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="26" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="27" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="28" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        <TrackerButton index="29" user={this.props.user} handleChange={this.handleChange} challenge={this.props.challenge}/>
        </div>
          {/* <div>
            <br />

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[0] === 2 && 'failed') ||
                  (challengeTracker[0] === 1 && 'completed') ||
                  (challengeTracker[0] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="0"
              >
                1
              </div>

              <div
                className={
                  (challengeTracker[1] === 2 && 'failed') ||
                  (challengeTracker[1] === 1 && 'completed') ||
                  (challengeTracker[1] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="1"
              >
                2
              </div>

              <div
                className={
                  (challengeTracker[2] === 2 && 'failed') ||
                  (challengeTracker[2] === 1 && 'completed') ||
                  (challengeTracker[2] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="2"
              >
                3
              </div>

              <div
                className={
                  (challengeTracker[3] === 2 && 'failed') ||
                  (challengeTracker[3] === 1 && 'completed') ||
                  (challengeTracker[3] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="3"
              >
                4
              </div>

              <div
                className={
                  (challengeTracker[4] === 2 && 'failed') ||
                  (challengeTracker[4] === 1 && 'completed') ||
                  (challengeTracker[4] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="4"
              >
                5
              </div>
            </div>

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[5] === 2 && 'failed') ||
                  (challengeTracker[5] === 1 && 'completed') ||
                  (challengeTracker[5] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="5"
              >
                6
              </div>

              <div
                className={
                  (challengeTracker[6] === 2 && 'failed') ||
                  (challengeTracker[6] === 1 && 'completed') ||
                  (challengeTracker[6] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="6"
              >
                7
              </div>

              <div
                className={
                  (challengeTracker[7] === 2 && 'failed') ||
                  (challengeTracker[7] === 1 && 'completed') ||
                  (challengeTracker[7] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="7"
              >
                8
              </div>

              <div
                className={
                  (challengeTracker[8] === 2 && 'failed') ||
                  (challengeTracker[8] === 1 && 'completed') ||
                  (challengeTracker[8] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="8"
              >
                9
              </div>

              <div
                className={
                  (challengeTracker[9] === 2 && 'failed') ||
                  (challengeTracker[9] === 1 && 'completed') ||
                  (challengeTracker[9] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="9"
              >
                10
              </div>
            </div>

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[10] === 2 && 'failed') ||
                  (challengeTracker[10] === 1 && 'completed') ||
                  (challengeTracker[10] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="10"
              >
                11
              </div>

              <div
                className={
                  (challengeTracker[11] === 2 && 'failed') ||
                  (challengeTracker[11] === 1 && 'completed') ||
                  (challengeTracker[11] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="11"
              >
                12
              </div>

              <div
                className={
                  (challengeTracker[12] === 2 && 'failed') ||
                  (challengeTracker[12] === 1 && 'completed') ||
                  (challengeTracker[12] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="12"
              >
                13
              </div>

              <div
                className={
                  (challengeTracker[13] === 2 && 'failed') ||
                  (challengeTracker[13] === 1 && 'completed') ||
                  (challengeTracker[13] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="13"
              >
                14
              </div>

              <div
                className={
                  (challengeTracker[14] === 2 && 'failed') ||
                  (challengeTracker[14] === 1 && 'completed') ||
                  (challengeTracker[14] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="14"
              >
                15
              </div>
            </div>

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[15] === 2 && 'failed') ||
                  (challengeTracker[15] === 1 && 'completed') ||
                  (challengeTracker[15] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="15"
              >
                16
              </div>

              <div
                className={
                  (challengeTracker[16] === 2 && 'failed') ||
                  (challengeTracker[16] === 1 && 'completed') ||
                  (challengeTracker[16] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="16"
              >
                17
              </div>

              <div
                className={
                  (challengeTracker[17] === 2 && 'failed') ||
                  (challengeTracker[17] === 1 && 'completed') ||
                  (challengeTracker[17] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="17"
              >
                18
              </div>

              <div
                className={
                  (challengeTracker[18] === 2 && 'failed') ||
                  (challengeTracker[18] === 1 && 'completed') ||
                  (challengeTracker[18] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="18"
              >
                19
              </div>

              <div
                className={
                  (challengeTracker[19] === 2 && 'failed') ||
                  (challengeTracker[19] === 1 && 'completed') ||
                  (challengeTracker[19] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="19"
              >
                20
              </div>
            </div>

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[20] === 2 && 'failed') ||
                  (challengeTracker[20] === 1 && 'completed') ||
                  (challengeTracker[20] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="20"
              >
                21
              </div>

              <div
                className={
                  (challengeTracker[21] === 2 && 'failed') ||
                  (challengeTracker[21] === 1 && 'completed') ||
                  (challengeTracker[21] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="21"
              >
                22
              </div>

              <div
                className={
                  (challengeTracker[22] === 2 && 'failed') ||
                  (challengeTracker[22] === 1 && 'completed') ||
                  (challengeTracker[22] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="22"
              >
                23
              </div>

              <div
                className={
                  (challengeTracker[23] === 2 && 'failed') ||
                  (challengeTracker[23] === 1 && 'completed') ||
                  (challengeTracker[23] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="23"
              >
                24
              </div>

              <div
                className={
                  (challengeTracker[24] === 2 && 'failed') ||
                  (challengeTracker[24] === 1 && 'completed') ||
                  (challengeTracker[24] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="24"
              >
                25
              </div>
            </div>

            <div className="set-of-five-checkboxes">
              <div
                className={
                  (challengeTracker[25] === 2 && 'failed') ||
                  (challengeTracker[25] === 1 && 'completed') ||
                  (challengeTracker[25] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="25"
              >
                26
              </div>

              <div
                className={
                  (challengeTracker[26] === 2 && 'failed') ||
                  (challengeTracker[26] === 1 && 'completed') ||
                  (challengeTracker[26] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="26"
              >
                27
              </div>

              <div
                className={
                  (challengeTracker[27] === 2 && 'failed') ||
                  (challengeTracker[27] === 1 && 'completed') ||
                  (challengeTracker[27] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="27"
              >
                28
              </div>

              <div
                className={
                  (challengeTracker[28] === 2 && 'failed') ||
                  (challengeTracker[28] === 1 && 'completed') ||
                  (challengeTracker[28] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="28"
              >
                29
              </div>

              <div
                className={
                  (challengeTracker[29] === 2 && 'failed') ||
                  (challengeTracker[29] === 1 && 'completed') ||
                  (challengeTracker[29] === 0 && 'not-attempted')
                }
                onClick={this.handleChange}
                id="29"
              >
                30
              </div>
            </div>
          </div> */}
        </div>
      );
  }
}
// }
