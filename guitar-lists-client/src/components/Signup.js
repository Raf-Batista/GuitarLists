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
        <form>
          <span>Sign Up</span>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
  }
}


export default withRouter(connect(null, {signup})(Home))
