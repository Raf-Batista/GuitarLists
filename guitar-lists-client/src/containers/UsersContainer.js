import React, { Component } from 'react';
import Users from '../components/Users';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className="container">
          <Users users={this.props.users}/>
      </div>
    )

  }
}

export default (UsersContainer)
