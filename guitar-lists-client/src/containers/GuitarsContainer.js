import React, { Component } from 'react';
import { connect } from 'redux'
import fetchGuitars from '../actions/fetchGuitars';

class GuitarsContainer {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.fetchGuitars()
  }
  render(){
    return(
      <p></p>
    )
  }
}

const mapStateToProps = (state) => {
  return { guitars: state }
}

export default connect(mapStateToProps, { fetchGuitars })(GuitarsContainer)
