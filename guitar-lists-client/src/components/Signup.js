import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '', username: '', password: '' }

  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
   event.preventDefault()
   this.props.signup(this.state)
   .then(userInfo => {
     if(!userInfo.errors){

     }
    console.log(userInfo)
   })

   this.setState({
     email: '',
     password: ''
   })
 }

  render(){
    return(
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleOnSubmit} className="signup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={ this.state.email } onChange={ this.handleOnChange }/>

          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={ this.state.username } onChange={ this.handleOnChange }/>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={ this.state.password } onChange={ this.handleOnChange }/>

          <input type="submit" />
        </form>
      </div>
    )
  }
}


export default Home
