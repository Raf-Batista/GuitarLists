import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchSellers from '../actions/fetchSellers';

class SellersContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.fetchSellers()
  }

  render(){
    return(
      <p>hey</p>
    )

  }
}

const mapStateToProps = (state) => {
  return { sellers: state }
}

export default connect(mapStateToProps, { fetchSellers })(SellersContainer)
