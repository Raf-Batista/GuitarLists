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
import login from './actions/login';
import logout from './actions/logout';
import editGuitar from './actions/editGuitar';
import deleteGuitar from './actions/deleteGuitar';
import GuitarForm from './components/GuitarForm';
import createGuitar from './actions/createGuitar';
import GuitarEditForm from './components/GuitarEditForm';
import Error from './components/Error';

class App extends Component {
  componentDidMount(){
   if(!this.props.users.length) {
    this.props.fetchUsers()
   }

   if(!this.props.guitars.length) {
    this.props.fetchGuitars()
   }
}

  render(){
    return (
      <div>
      <NavBar currentUser={this.props.currentUser} logout={this.props.logout} login={this.props.login} />
        <Switch>
          <Route exact path='/' render={routeProps => <Home  {...routeProps}/>}/>
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

export default connect(mapStateToProps, {login, logout, createGuitar, editGuitar, deleteGuitar, fetchUsers, fetchGuitars})(App);
