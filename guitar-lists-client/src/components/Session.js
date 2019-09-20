import React, { Component } from 'react';

export default class Session extends Component {
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
    this.setState({
      email: '',
      password: ''
    })
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <label name="email">
            Email
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleOnChange}/>
          </label>
          <label name="password">
            Password
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleOnChange}/>
          </label>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
