import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchGuitars from '../actions/fetchGuitars';

class GuitarsContainer extends Component {
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
  return { guitars: state.guitars }
}

export default connect(mapStateToProps, { fetchGuitars })(GuitarsContainer)
