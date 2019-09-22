import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';
import About from './components/About'
import Login from './components/Login'
import UsersContainer from './containers/UsersContainer';
import GuitarsContainer from './containers/GuitarsContainer';
import { connect } from 'react-redux';
import signup from './actions/signup';
import login from './actions/login';
import loginCurrentUser from './actions/loginCurrentUser';

class App extends Component {

  render(){
    return (
      <div>
      <NavBar currentUser={this.props.currentUser}/>
        <Switch>
          <Route exact path='/' render={routeProps => <Home signup = {this.props.signup} loginCurrentUser={this.props.loginCurrentUser} currentUser={this.props.currentUser}{...routeProps}/>}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/login' render={routeProps => <Login currentUser={this.props.currentUser} login = {this.props.login} {...routeProps}/>}/>/>
        </Switch>
        <UsersContainer />
        <GuitarsContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, {signup, login, loginCurrentUser})(App);
