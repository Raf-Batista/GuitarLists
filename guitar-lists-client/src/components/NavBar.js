import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions/login';
import logout from '../actions/logout';

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
    return(
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
    
            </div>
            {
              this.props.currentUser.username ? 
               <div className=" d-flex d-inline">
                  <NavLink /* render button to create a new guitar if logged in */
                    exact
                    activeClassName='active-link'
                    className = 'newGuitarForm nav-link'
                    to={`/users/${this.props.currentUser.id}/guitars/new`}>
                    Post
                </NavLink>

                {/* If user is logged in, render logout button*/}
                <button name="logout" className = 'logout btn btn-primary' onClick={this.handleLogout}> Logout </button>

               </div>  : 
              
               <div>  {/* render login form when not logged in */}
                <form onSubmit={this.handleLogin} >
                  <label name="email" className="text-light mx-2">Email</label>
                  <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>

                  <label name="password" className="text-light mx-2">Password </label>
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>

                  <button className="btn btn-primary ml-2" name="login" type="submit">Login</button>
                </form>
              </div>
            }
          </div>
        </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {login, logout})(NavBar))
