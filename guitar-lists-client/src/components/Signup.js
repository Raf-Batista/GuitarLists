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
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row mt-5">
            <label className="col-sm-2 col-form-label" name="email">Email</label>
              <div className="col-sm-10">
                <input className="form-control" type="email" name="email" value={ this.state.email } onChange={ this.handleChange }/>
              </div>
          </div>

          <div className="form-group row mt-5">
            <label className="col-sm-2 col-form-label" name="username">Username</label>
              <div className="col-sm-10">
                <input className="form-control" type="text" name="username" value={ this.state.username } onChange={ this.handleChange }/>
              </div>
          </div>

          <div className="form-group row mt-5">
            <label className="col-sm-2 col-form-label" name="password">Password</label>
              <div className="col-sm-10">
                <input className="form-control" type="password" name="password" value={ this.state.password } onChange={ this.handleChange }/>
              </div>
          </div>

          <div className="text-center mt-5">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    )
  }
}


export default withRouter(connect(null, {signup})(Home))
