import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
     password: ''
   })
 }

  render(){
    return(
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit} className="signup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={ this.state.email } onChange={ this.handleChange }/>

          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange }/>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange }/>

          <input type="submit" />
        </form>
      </div>
    )
  }
}


export default withRouter(Home)
