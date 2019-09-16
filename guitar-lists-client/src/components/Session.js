import React, { Component } from 'react';

export default class Session extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <form>
          <label name="username">
            Username
          <input type="text" name="username" />
          </label>
          <label name="password">
            Password
          <input type="password" name="password" />
          </label>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
