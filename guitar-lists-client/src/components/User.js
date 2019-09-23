import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

class User extends Component {

  render(){
    const user = this.props.location.state.user

    return(
      <div>
        <p>{user.username}</p>
        {user.guitars.map(guitar => {
          const url = `/users/${guitar.user_id}/guitars/${guitar.id}`
          return <div>
            <NavLink
              key={guitar.id}
              activeClassName = 'active-link'
              className = 'home navbar-brand'
              exact
              to={{pathname: url, state: {guitar: guitar}}}>
              {guitar.model}  ${guitar.price}
            </NavLink>


          </div>
        })}
      </div>
    )
  }
}

export default withRouter(User)
