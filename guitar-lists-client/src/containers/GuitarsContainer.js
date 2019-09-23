import React, { Component } from 'react';
import Guitars from '../components/Guitars'

class GuitarsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <Guitars guitars={this.props.guitars} />
    )
  }
}

export default (GuitarsContainer)
