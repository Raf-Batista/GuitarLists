import React, { Component } from 'react';

class User extends Component {
  componentDidMount(){
//    const { handle } = this.props.match.params
  }

  render(){
    return(
      <div>
        <p>{console.log(this.props)}</p>
      </div>
    )
  }
}

export default User
