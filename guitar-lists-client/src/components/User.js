import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {user: '', errors: ''}
  }
  componentDidMount(){
    let user = this.props.users.find(user => {
        if(user.id === parseInt(this.props.match.params.id)){
          return user
        }
      })
    user.guitars = this.props.guitars.filter(guitar => guitar.user_id === user.id)
    this.setState({user: user})
  }

  render(){
    return(
      <div className="container mt-5">
        {
          this.state.user.username ? 
            <div className="text-center text-light">
              <h2>{this.state.user.username}</h2>
              <h3 className="mt-2">My Guitars</h3>
              {this.state.user.guitars.map(guitar => {
                return <div className="mt-4" key={ guitar.id}>
                  <NavLink
                    activeClassName = 'active-link'
                    exact
                    to={`/users/${guitar.user_id}/guitars/${guitar.id}`}>
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
  return {
    users: state.users, 
    guitars: state.guitars
  }
}

export default withRouter(connect(mapStateToProps)(User))
