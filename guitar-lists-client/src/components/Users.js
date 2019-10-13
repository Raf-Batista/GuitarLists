import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Users extends Component {

  render(){
    let url;
    return(
      <div id="users">
        {this.props.users.map(user => {
          url=`users/${user.id}`
            return <NavLink
            key={user.id}
            exact
            activeClassName = 'active-link'
            className = 'home navbar-brand d-block'
            to={{pathname: url, state: {user: user}}}>
            {user.username}
          </NavLink>
        })}
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProp)(Users)
