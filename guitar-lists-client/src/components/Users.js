import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Users extends Component {

  render(){
    let userUrl;
    return(
      <div id="users">
        {this.props.users.map(user => {
          userUrl=`users/${user.id}`
          return <NavLink key={user.id} exact activeClassName = 'active-link' className = 'home navbar-brand' to={{pathname: userUrl, state: {user: user}}}>{user.username}</NavLink>
        })}
      </div>
    )
  }
}

export default Users
