import React, { Component } from 'react';
import Users from '../components/Users';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <Users users={this.props.users}/>
    )

  }
}

export default (UsersContainer)
