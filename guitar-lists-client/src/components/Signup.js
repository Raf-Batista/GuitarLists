import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import signup from '../actions/signup';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '', username: '', password: '' }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
   event.preventDefault()
   this.props.signup(this.state, this.props.history)
   this.setState({
     email: '',
     username: '',
     password: ''
   })
 }

  render(){
    return(
        <form onSubmit={this.handleSubmit} className="text-white">
          <h3>Sign Up</h3>
          <div class="form-group">
            <label for="username">Username</label>
            <input name="username" onChange={this.handleChange} type="text" className="form-control space" id="username" placeholder="Example" />
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input name="email" onChange={this.handleChange} type="email" className="form-control space" id="email" placeholder="Example@email.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input name="password" onChange={this.handleChange} type="password" className="form-control space" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
  }
}


export default withRouter(connect(null, {signup})(Home))
