import React, { Component } from 'react';
import Signup from './Signup';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  componentDidMount () {
    if(!this.props.currentUser.username){
      this.props.loginCurrentUser()
    }

  }

  render(){

    return(
      <div id="home">
        {
          this.props.currentUser.username ? // if a user is found in redux state, redirect them to User's show page, else render signup form
          <Redirect to={{pathname: `/users/${this.props.currentUser.id}`}} /> :
          <div>
            <h1>Welcome to GuitarLists</h1>
            <Signup signup={this.props.signup}/>
          </div>
        }
      </div>
    )
  }
}

export default Home
