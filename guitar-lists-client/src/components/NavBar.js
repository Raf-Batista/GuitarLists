import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div>
        <nav class="navbar navbar-dark bg-dark">
        <NavLink exact activeClassName = 'active-link' className = 'home navbar-brand' to='/'>
          <i class="fas fa-guitar"></i>
          GuitarLists
        </NavLink>
        <NavLink exact activeClassName = 'active-link' className = 'about' to='/about'>
          About
        </NavLink>''
        </nav>
      </div>
    )
  }
}

export default withRouter(NavBar)
