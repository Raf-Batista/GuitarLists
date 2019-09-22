import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  handleOnClick = () => {
    this.props.logout()
  }
  render(){
    let button;
    if(this.props.currentUser.username){
      button = <NavLink exact activeClassName = 'active-link' className = 'logout nav-link' onClick={this.props.logout} to="#">
        Logout
      </NavLink>
    } else {
      button = <NavLink exact activeClassName = 'active-link' className = 'login nav-link' to='/login'>
        Login
      </NavLink>
    }
    return(
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark ">
        <NavLink exact activeClassName = 'active-link' className = 'home navbar-brand' to='/'>
          <i className="fas fa-guitar"></i>
          GuitarLists
        </NavLink>
          <div className="nav mr-auto">
            <NavLink exact activeClassName = 'active-link' className = 'about nav-link' to='/about'>
              About
            </NavLink>
            {button}
            </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default withRouter(NavBar)
