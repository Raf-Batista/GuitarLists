import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';
import About from './components/About'
import Session from './components/Session'
import UsersContainer from './containers/UsersContainer';
import GuitarsContainer from './containers/GuitarsContainer';
import { connect } from 'react-redux';
import signup from './actions/signup';
import login from './actions/login';

class App extends Component {
  render(){
    return (
      <div>
      <NavBar />
        <Switch>
          <Route exact path='/' render={routeProps => <Home signup = {this.props.signup} {...routeProps}/>}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/login' render={routeProps => <Session session={this.props.session} login = {this.props.login} {...routeProps}/>}/>/>
        </Switch>
        <UsersContainer />
        <GuitarsContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {session: state.session}
}

export default connect(mapStateToProps, {signup, login})(App);
