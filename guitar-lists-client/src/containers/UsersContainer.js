import React, { Component } from 'react';
import Users from '../components/Users';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className="container">
          <div className="jumbotron text-center">
            <h1>Sellers</h1>
            <Users users={this.props.users}/>
          </div>
      </div>
    )

  }
}

export default (UsersContainer)
