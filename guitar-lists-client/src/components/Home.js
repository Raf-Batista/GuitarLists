import React, { Component } from 'react';
import Signup from './Signup';
class Home extends Component {

  render(){
    return(
      <div>
        <h1>Welcome to GuitarLists</h1>
        <Signup />
      </div>
    )
  }
}


export default Home
