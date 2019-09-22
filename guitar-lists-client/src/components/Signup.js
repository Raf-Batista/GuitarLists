import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: '' }

  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
   event.preventDefault()
   console.log(this.state)
   this.props.signup(this.state)
   .then(userInfo => {

    console.log(userInfo)
   })

   this.setState({
     email: '',
     password: ''
   })
 }

  render(){
    return(
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleOnSubmit} className="signup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={ this.state.username } onChange={ this.handleOnChange }/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={ this.state.password } onChange={ this.handleOnChange }/>

          <input type="submit" />
        </form>
      </div>
    )
  }
}


export default Home
