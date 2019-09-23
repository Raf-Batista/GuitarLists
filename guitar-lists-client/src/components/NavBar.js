import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {email: '', password: ''}
  }
  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.login(this.state, this.props.location, this.props.history)
    this.setState({
      email: '',
      password: ''
    })
  }

  handleLogout = () => {
    this.props.logout(this.props.location, this.props.history)
  }
  render(){
    let button;
    let formButton;
    if(this.props.currentUser.username) {
      button = <button name="logout" className = 'logout btn btn-primary' onClick={this.handleLogout}> Logout </button>

      formButton = <div><NavLink
                      exact
                      activeClassName='active-link'
                      className = 'newGuitarForm nav-link'
                      to={{pathname: `/users/${this.props.currentUser.id}/guitars/new`}}>
                      Post
                      </NavLink>
                  </div>
    } else {
      button = <div className = "loginForm"> {/* render login form when logged in */}
        <form onSubmit={this.handleLogin} >
          <label name="email">Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleOnChange}/>

          <label name="password">Password </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange}/>

          <button className="btn btn-primary ml-2" name="login" type="submit">Login</button>
        </form>
      </div>
    }
    return(
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark ">
        {/* Guitar Logo */}
        <NavLink exact activeClassName = 'active-link' className = 'home navbar-brand' to='/'>
          <i className="fas fa-guitar"></i>
          GuitarLists
        </NavLink>

          <div className="nav mr-auto">
            <NavLink exact activeClassName = 'active-link' className = 'about nav-link' to='/guitars'>
              Guitars
            </NavLink>

            <NavLink exact activeClassName = 'active-link' className = 'about nav-link' to='/users'>
              Sellers
            </NavLink>

            <NavLink exact activeClassName = 'active-link' className = 'about nav-link' to='/about'>
              About
            </NavLink>
            {formButton}
            {button}
            </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default withRouter(NavBar)
