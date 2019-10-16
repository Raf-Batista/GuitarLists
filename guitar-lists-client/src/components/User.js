import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {user: '', errors: ''}
  }
  componentDidMount(){
    this.setState({
      user: this.props.currentUser
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentUser !== prevProps.currentUser) {
      this.setState({
        user: this.props.currentUser
      })
    }
  }

  render(){
    return(
      <div className="container">
        {
          this.state.user ? 
            <div className="jumbotron text-center">
              <h1>{this.state.user.username}</h1>
              {/* The conditional checks if user.guitars is truthy before calling map */}
              {this.state.user.guitars && this.state.user.guitars.map(guitar => {
                const url = `/users/${guitar.user_id}/guitars/${guitar.id}`
                return <div className="mt-4" key={ guitar.id}>
                  <NavLink
                    activeClassName = 'active-link'
                    exact
                    to={{pathname: url, state: {guitar: guitar}}}>
                    {guitar.model}  ${guitar.price}
                  </NavLink>
                </div>
              })}
            </div> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {users: state.users}
}

export default connect(mapStateToProps)(withRouter(User))
