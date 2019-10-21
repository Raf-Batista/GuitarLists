import React, { Component } from 'react';
import Signup from './Signup';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render(){
    return(
      <div className="container">
        {
          this.props.currentUser.username ? // if a user is found in redux state, redirect them to User's show page, else render signup form
          <Redirect to={`/users/${this.props.currentUser.id}`} /> :
          <div className="jumbotron text-center">
            <h1>Welcome to GuitarLists</h1>
            <Signup />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Home)
