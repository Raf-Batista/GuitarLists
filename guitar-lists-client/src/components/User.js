import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {user: '', errors: ''}
  }
  componentDidMount(){
    /*
    If user did not come to this page via link, fetch user data
    based on id in params, if user came via link there will user data already
    The else will run which takes data from props passed in to state from NavLink
    */
    if(!this.props.location.state) { // will run if props not found from NavLink
      this.setState({
        user: this.props.currentUser
      })
    } else {
      this.setState({
        user: this.props.location.state.user
      })
    }
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
              {/* Render can run before componentDidMount, the conditional checks if user.guitars is truthy before calling map
                  This code will run if fetch returns a user, will render errors above if could not find user */}
                  {this.state.user.guitars && this.state.user.guitars.map(guitar => {
                const url = `/users/${guitar.user_id}/guitars/${guitar.id}`
                return <div className="mt-4">
                  <NavLink
                    key={guitar.id}
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
