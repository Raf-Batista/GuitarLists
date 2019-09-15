import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink exact activeClassName = 'active-link' className = 'home navbar-brand' to='/'>
          <i class="fas fa-guitar"></i>
          GuitarLists
        </NavLink>
        <ul class="navbar-nav mr-auto">
          <li>
            <NavLink exact activeClassName = 'active-link' className = 'about' to='/about'>
              About
            </NavLink>
          </li>
        </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(NavBar)
