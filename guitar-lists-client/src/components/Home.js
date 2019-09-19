import React, { Component } from 'react';

export default class Home extends Component {
  render(){
    return(
      <div>
        <h1>Welcome to GuitarLists</h1>
        <div>
          <form>
            <label name="username">Username</label>
            <input type="text" name="usernmame" />

            <label name="password">Password</label>
            <input type="password" name="password" />

            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}
