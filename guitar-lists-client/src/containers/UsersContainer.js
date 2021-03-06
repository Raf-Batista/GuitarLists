import React, { Component } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {query: '', users: ''}
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }


  render(){
    const {query} = this.state;
    const lowercasedQuery = query.toLowerCase();
    const filteredUsers = this.props.users.filter(user => { 
      if(user.username.toLowerCase().includes(lowercasedQuery)) {
        return user
      }
    })
    return(
      <div className="container">
          <div className="text-center text-light mt-5">
            <h1>Sellers</h1>
            <label className="m-2">Search</label>
            <input className="space" type="text" name="search" onChange={this.handleChange} value={this.state.query} placeholder="Search for a Seller"/> 
            <Users users={filteredUsers}/>
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


export default connect(mapStateToProps)(UsersContainer)
