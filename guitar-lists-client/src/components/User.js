import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

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
      const id = this.props.match.params.id
      fetch(`http://localhost:3000/users/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: data,
          errors: data.errors
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
        <div>
          {
            this.state.errors ? <p>{this.state.errors}</p> : // return errors if user not found
              <div>
                <p>{this.state.user.username}</p>
                {/* Render can run before componentDidMount, the conditional checks if user.guitars is truthy before calling map
                    This code will run if fetch returns a user, will render errors above if could not find user */}
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
         }
        </div>
      </div>
    )
  }
}

export default withRouter(User)
