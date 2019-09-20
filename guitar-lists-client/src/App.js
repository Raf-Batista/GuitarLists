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

class App extends Component {
  render(){
    return (
      <div>
      <NavBar />
        <Switch>
          <Route exact path='/' render={routeProps => <Home session={this.props.session} {...routeProps}/>}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/login' component={Session}/>
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

export default connect(mapStateToProps)(App);
