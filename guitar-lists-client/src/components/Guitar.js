import React, { Component } from 'react';

class Guitar extends Component {

  render(){
    const guitar = this.props.location.state.guitar

    return(
      <div>
        <p>{guitar.model}</p>
      </div>
    )
  }
}

export default Guitar
