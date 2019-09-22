import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''}
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state)
  }
  render(){
    if(this.props.currentUser.username){
      this.props.history.push('/')
    }
    return(
      <div>
        <form onSubmit={this.handleOnSubmit} className="loginForm">
          <label name="email">Email</label>
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleOnChange}/>

          <label name="password">Password </label>
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleOnChange}/>

          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
