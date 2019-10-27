import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Users extends Component {

  render(){
    let url;
    return(
      <div id="users">
        {this.props.users.map(user => {
            return <NavLink
            key={user.id}
            exact
            activeClassName = 'active-link'
            className = 'home navbar-brand d-block'
            to={`users/${user.id}`}>
            {user.username}
          </NavLink>
        })}
      </div>
    )
  }
}

export default Users
