import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {email: '', password: ''}
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.login(this.state, this.props.location, this.props.history, this.props.users)
    this.setState({
      email: '',
      password: ''
    })
  }

  handleLogout = () => {
    this.props.logout(this.props.location, this.props.history)
  }
  render(){
    let logoutButton;
    let loginForm;
    let newGuitarButton;
    if(this.props.currentUser.username) { {/* render log out button if logged in */}
      logoutButton = <button name="logout" className = 'logout btn btn-primary' onClick={this.handleLogout}> Logout </button>

      newGuitarButton = <div> {/* render button to create a new guitar if logged in */}
                     <NavLink
                        exact
                        activeClassName='active-link'
                        className = 'newGuitarForm nav-link'
                        to={`/users/${this.props.currentUser.id}/guitars/new`}>
                        Post
                      </NavLink>
                  </div>
    } else {
      loginForm = 
        <div> {/* render login form when not logged in */}
          <form onSubmit={this.handleLogin} >
            <label name="email" className="text-light mx-2">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>

            <label name="password" className="text-light mx-2">Password </label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>

            <button className="btn btn-primary ml-2" name="login" type="submit">Login</button>
          </form>
        </div>
    }
    return(
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
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
            {newGuitarButton}
            </div>
            {logoutButton}
            {loginForm}
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(NavBar)
