import React, { Component } from 'react';
import Signup from './Signup';
import { connect } from 'react-redux';
class Home extends Component {

  render(){
  let greeting = '';

  if(this.props.session.username) {
    greeting = <p>Welcome {this.props.session.username}</p>
  } else {
    greeting =  <Signup signup={this.props.signup}/>
  }

    return(
      <div>
        <h1>Welcome to GuitarLists</h1>
        {greeting}
        {console.log(this.props.session.username)}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {session: state.session}
}

export default connect(mapStateToProps)(Home)
