import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';
import About from './components/About'
import UsersContainer from './containers/UsersContainer';
import User from './components/User';
import Guitar from './components/Guitar';
import GuitarsContainer from './containers/GuitarsContainer';
import fetchGuitars from './actions/fetchGuitars';
import fetchUsers from './actions/fetchUsers';
import signup from './actions/signup';
import login from './actions/login';
import loginCurrentUser from './actions/loginCurrentUser';
import logout from './actions/logout';
import editGuitar from './actions/editGuitar';
import deleteGuitar from './actions/deleteGuitar';
import GuitarForm from './components/GuitarForm';
import createGuitar from './actions/createGuitar';
import GuitarEditForm from './components/GuitarEditForm';
import Error from './components/Error';

class App extends Component {
  componentDidMount(){
    /*
      With the way the app is set up. Home redirects to User show. fetchUsers() and fetchGuitars() runs in the containers everytime it is mounted
      User show will not have Users or Guitars in store, so the methods below will update the store initially
    */
    this.props.fetchUsers()
    this.props.fetchGuitars()
    this.props.loginCurrentUser()
  }

  render(){
    return (
      <div>
      <NavBar currentUser={this.props.currentUser} logout={this.props.logout} login={this.props.login} users={this.props.users}/>
        <Switch>
          <Route exact path='/' render={routeProps => <Home signup ={this.props.signup}  {...routeProps}/>}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/guitars' render={routeProps => <GuitarsContainer {...routeProps}/>}/>
          <Route exact path='/users/:id/guitars/new' render={routeProps => <GuitarForm  createGuitar={this.props.createGuitar} {...routeProps}/>}/>
          <Route exact path='/users/:userId/guitars/:guitarId/edit' render={routeProps => <GuitarEditForm  editGuitar={this.props.editGuitar} {...routeProps}/>}/>
          <Route exact path='/users/:userId/guitars/:guitarId' render={routeProps => <Guitar  deleteGuitar={this.props.deleteGuitar} {...routeProps}/>}/>
          <Route exact path='/users' render={routeProps => <UsersContainer {...routeProps}/>}/>
          <Route exact path='/users/:id' render={routeProps => <User  {...routeProps}/>}/>
          <Route component={Error}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    users: state.users,
    guitars: state.guitars
  }
}

export default connect(mapStateToProps, {signup, login, loginCurrentUser, logout, createGuitar, editGuitar, deleteGuitar, fetchUsers, fetchGuitars})(App);
