import React, { Component } from 'react';

class User extends Component {

  render(){
    return(
      <div>
        <p>{this.props.user.username}</p>
      </div>
    )
  }
}

export default User
