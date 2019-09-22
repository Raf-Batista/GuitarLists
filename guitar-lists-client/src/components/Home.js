import React, { Component } from 'react';
import Signup from './Signup';

class Home extends Component {
  componentDidMount () {
    if(!this.props.currentUser.username){
      this.props.loginCurrentUser()
    }

  }

  render(){
    let greeting = '';

    if(this.props.currentUser.username) {
      greeting = <p>Welcome {this.props.currentUser.username}</p>
    } else {
      greeting =  <Signup signup={this.props.signup}/>
    }
    return(
      <div id="home">
        <h1>Welcome to GuitarLists</h1>
        {greeting}
      </div>
    )
  }
}

export default Home
