import React, { Component } from 'react'

export default class FullTracker extends Component {
  state = {
    array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0],
    user: ''
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    // console.log('user tracker array', this.state.user.challenges[0].tracker);
    let challengeTracker = this.state.user.challenges[0].tracker
    let index = target.id
    console.log('index', index);
    if(challengeTracker[index] === 0){
      challengeTracker[index] ++
    } else if(challengeTracker[index] === 1){
      challengeTracker[index] ++
    } else {
      challengeTracker[index] --
    }
    console.log('after click', challengeTracker);
    console.log('user after click', this.state.user);
    this.setState({
      [name]: value,
    });
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
    });
  };

  render() {
    // const activeChallenges = this.props.user.challenges.filter(challenge => challenge.status === 'active')
    // console.log(this.state.user);
    // console.log('props from full tracker page', this.props);
    return (
      <div className="full-tracker">
        Tracker for {this.props.challenge.id}
        <div>
          <br/>
          {/* <fieldset id="one"> */}
          <label htmlFor="1">1</label>
          <input type="checkbox" name="one" id="1" onClick={this.handleChange} checked={this.state.one}/>
          {/* <label htmlFor="oneFail">1 no</label>
          <input type="checkbox" name="one" id="oneFail" onChange={this.handleChange} checked={this.state.one} /> */}
          {/* </fieldset> */}
          <br/>
          <label htmlFor="two">2</label>
          <input type="checkbox" name="two" id="2" onClick={this.handleChange} checked={this.state.two}/>
          {/* <br/>
          <label htmlFor="3">3</label>
          <input type="checkbox" name="3" id="3"/> */}
          {/* <br/>
          <label htmlFor="4">4</label>
          <input type="checkbox" name="4" id="4"/>
          <br/>
          <label htmlFor="5">5</label>
          <input type="checkbox" name="5" id="5"/>
          <br/>
          <label htmlFor="6">6</label>
          <input type="checkbox" name="6" id="6"/>
          <br/>
          <label htmlFor="7">7</label>
          <input type="checkbox" name="7" id="7"/>
          <br/>
          <label htmlFor="8">8</label>
          <input type="checkbox" name="8" id="8"/>
          <br/>
          <label htmlFor="9">9</label>
          <input type="checkbox" name="9" id="9"/>
          <br/>
          <label htmlFor="10">10</label>
          <input type="checkbox" name="10" id="10"/>
          <br/>
          <label htmlFor="11">11</label>
          <input type="checkbox" name="11" id="11"/>
          <br/>
          <label htmlFor="12">12</label>
          <input type="checkbox" name="12" id="12"/>
          <br/>
          <label htmlFor="13">13</label>
          <input type="checkbox" name="13" id="13"/>
          <br/>
          <label htmlFor="14">14</label>
          <input type="checkbox" name="14" id="14"/>
          <br/>
          <label htmlFor="15">15</label>
          <input type="checkbox" name="15" id="15"/>
          <br/>
          <label htmlFor="16">16</label>
          <input type="checkbox" name="16" id="16"/>
          <br/>
          <label htmlFor="17">17</label>
          <input type="checkbox" name="17" id="17"/>
          <br/>
          <label htmlFor="18">18</label>
          <input type="checkbox" name="18" id="18"/>
          <br/>
          <label htmlFor="19">19</label>
          <input type="checkbox" name="19" id="19"/>
          <br/>
          <label htmlFor="20">20</label>
          <input type="checkbox" name="20" id="20"/>
          <br/>
          <label htmlFor="21">21</label>
          <input type="checkbox" name="21" id="21"/>
          <br/>
          <label htmlFor="22">22</label>
          <input type="checkbox" name="22" id="22"/>
          <br/>
          <label htmlFor="23">23</label>
          <input type="checkbox" name="23" id="23"/>
          <br/>
          <label htmlFor="24">24</label>
          <input type="checkbox" name="24" id="24"/>
          <br/>
          <label htmlFor="25">25</label>
          <input type="checkbox" name="25" id="25"/>
          <br/>
          <label htmlFor="26">26</label>
          <input type="checkbox" name="26" id="26"/>
          <br/>
          <label htmlFor="27">27</label>
          <input type="checkbox" name="27" id="27"/>
          <br/>
          <label htmlFor="28">28</label>
          <input type="checkbox" name="28" id="28"/>
          <br/>
          <label htmlFor="29">29</label>
          <input type="checkbox" name="29" id="29"/>
          <br/>
          <label htmlFor="30">30</label>
          <input type="checkbox" name="30" id="30"/> */}
        </div>
      </div>
    )
  }
}
