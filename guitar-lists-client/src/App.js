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
import signup from './actions/signup';
import login from './actions/login';
import loginCurrentUser from './actions/loginCurrentUser';
import logout from './actions/logout';
import fetchUsers from './actions/fetchUsers';
import fetchGuitars from './actions/fetchGuitars';
import editGuitar from './actions/editGuitar';
import deleteGuitar from './actions/deleteGuitar';
import GuitarForm from './components/GuitarForm';
import createGuitar from './actions/createGuitar';
import GuitarEditForm from './components/GuitarEditForm';
import Error from './components/Error';

class App extends Component {
  componentDidMount(){
    this.props.fetchUsers()
    this.props.fetchGuitars()
    this.props.loginCurrentUser()
  }

  render(){
    return (
      <div>
      <NavBar currentUser={this.props.currentUser} logout={this.props.logout} login={this.props.login}/>
        <Switch>
          <Route exact path='/' render={routeProps => <Home signup = {this.props.signup} loginCurrentUser={this.props.loginCurrentUser} currentUser={this.props.currentUser}{...routeProps}/>}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/guitars' render={routeProps => <GuitarsContainer guitars={this.props.guitars}{...routeProps}/>}/>
          <Route exact path='/users/:id/guitars/new' render={routeProps => <GuitarForm currentUser={this.props.currentUser} createGuitar={this.props.createGuitar}{...routeProps}/>}/>
          <Route exact path='/users/:userId/guitars/:guitarId/edit' render={routeProps => <GuitarEditForm currentUser={this.props.currentUser} guitars={this.props.guitars} editGuitar={this.props.editGuitar} {...routeProps}/>}/>
          <Route exact path='/users/:userId/guitars/:guitarId' render={routeProps => <Guitar currentUser={this.props.currentUser} deleteGuitar={this.props.deleteGuitar} {...routeProps}/>}/>
          <Route exact path='/users' render={routeProps => <UsersContainer users={this.props.users}{...routeProps}/>}/>
          <Route exact path='/users/:id' component={User}/>
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

export default connect(mapStateToProps, {signup, login, loginCurrentUser, logout, fetchUsers, fetchGuitars, createGuitar, editGuitar, deleteGuitar})(App);
