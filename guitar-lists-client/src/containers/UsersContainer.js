import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchUsers from '../actions/fetchUsers';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.fetchUsers()
  }

  render(){
    return(
      <p></p>
    )

  }
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps, { fetchUsers })(UsersContainer)
