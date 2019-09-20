import React, { Component } from 'react';
import signup from '../actions/signup'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}
  }
  render(){
    const handleOnSubmit = (event) => {
      event.preventDefault()
    
    }
    return(
      <div>
        <h1>Welcome to GuitarLists</h1>
        <div>
          <h2>Sign Up</h2>
          <form>
            <label name="username">Username</label>
            <input type="text" name="usernmame" />

            <label name="password">Password</label>
            <input type="password" name="password" />

            <input type="submit" onSubmit={handleOnSubmit}/>
          </form>
        </div>
      </div>
    )
  }
}
