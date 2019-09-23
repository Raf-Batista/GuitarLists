import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {user: ''}
  }
  componentDidMount(){
    // If user did not come to this page via link, fetch user data
    // based on id in params, if user came via link there will user data already
    if(!this.props.location.state) {
      const id = this.props.match.params.id
      fetch(`http://localhost:3000/users/${id}`)
      .then(response => response.json())
      .then(user => {
        this.setState({
          user: user
        })
      }).catch(error => console.log(error))
    } else {
      this.setState({
        user: this.props.location.state.user
      })
    }
  }

  render(){

    return(
      <div>
      <p>{this.state.user.username}</p>
      {/* render can run before component did mount, the conditional prevents Typerror undefined */}
      {this.state.user.guitars && this.state.user.guitars.map(guitar => {
        const url = `/users/${guitar.user_id}/guitars/${guitar.id}`
        return <div>
          <NavLink
            key={guitar.id}
            activeClassName = 'active-link'
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
