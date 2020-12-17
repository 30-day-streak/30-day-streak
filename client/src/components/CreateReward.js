import React, { Component } from 'react'
import axios from 'axios';

export default class CreateReward extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      category: 'entertainment',
      url: '',
      showForm: true
    }
    this.initialState = this.state
  }

  getData = () => {
    axios.get('/api/rewards')
      .then(response => {
        console.log({ response });

        this.setState({
          rewards: response.data
        })
      })
      .catch(err => console.log(err))
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log('state form create rewards', this.state);
  };

  resetState = () => {
    this.setState(this.initialState)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call to api
    axios
      .post('/api/rewards', {
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        url: this.state.url
      })
      .then((response) => {
        console.log(`axios response`, response);
        // reinitialise state
        this.resetState()
        this.getData()
        this.props.history.push('/rewards');
      })
      .catch(err => console.log(err));
  }

  toggleAddReward = () => {
    this.setState((state) => ({
      showForm: !state.showForm
    }));
  }

  render() {
    return (
      <div>
        <h2 onClick={this.toggleAddReward}>Create a new reward</h2>
        {this.state.showForm &&
          <div>
            <p>Need some ideas for incentives to achieving your goals?</p>
            <p>Check out what <a href="#">other users have added</a> or see if there is something you like on 
            <a href="https://www.developgoodhabits.com/reward-yourself/" target="_blank"> this list </a>
             or <a href="https://organisemyhouse.com/reward-yourself/" target="_blank">this one</a>.</p>

            <br />
            <form onSubmit={this.handleSubmit}>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                placeholder="Give your reward a name"
                onChange={this.handleChange}
              />
              <br />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                placeholder="Add a more detailed description if you need one"
                onChange={this.handleChange} />
              <br />

              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={this.state.category}
                placeholder="Select category"
                onChange={this.handleChange}>
                {/* <option value="" selected="selected">Select a category</option> */}
                <option value="entertainment">Art and Entertainment</option>
                <option value="food">Food</option>
                <option value="self-care">Self-care</option>
                <option value="shopping">Shopping</option>
                <option value="travel and outdoors">Travel and Outdoors</option>
                <option value="Other">Other</option>
              </select>
              <br />

              <label htmlFor="url">Link</label>
              <input
                type="text"
                id="url"
                name="url"
                value={this.state.url}
                placeholder="You can add a link to an internet page here"
                onChange={this.handleChange} />
              <br />

              <button type="submit">Save to my list of rewards</button><button type="cancel" onClick={this.resetState}>Cancel</button>
            </form>
          </div>
        }
      </div >
    )
  }
}
