import React, { Component } from 'react';
import Users from '../components/Users';
import fetchUsers from '../actions/fetchUsers';
import { connect } from 'react-redux';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render(){
    return(
      <div className="container">
          <div className="jumbotron text-center">
            <h1>Sellers</h1>
            <Users users={this.props.users}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { fetchUsers })(UsersContainer)
