import React, { Component } from 'react';

class User extends Component {

  render(){
    const user = this.props.location.state.user

    return(
      <div>
        <p>{user.username}</p>
      </div>
    )
  }
}

export default User
