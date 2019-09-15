import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
class NavBar extends Component {
  render(){
    return(
      <div>
        <NavLink exact activeClassName = 'active-link' className = 'home' to='/'>
          Home
        </NavLink>
        <NavLink exact activeClassName = 'active-link' className = 'about' to='/about'>
          About
        </NavLink>
      </div>
    )
  }
}

export default withRouter(NavBar)