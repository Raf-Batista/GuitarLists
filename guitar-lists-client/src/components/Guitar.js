import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Guitar extends Component {
  constructor(props) {
    super(props)
    this.state = {guitar: ''}
  }
  componentDidMount(){
    // If user did not come to this page via link, fetch user data
    // based on id in params, if user came via link there will user data already
    if(!this.props.location.state) {
      const {userId, guitarId} = this.props.match.params
      fetch(`http://localhost:3000/users/${userId}/guitars/${guitarId}`)
      .then(response => response.json())
      .then(guitar => {
        console.log(guitar)
        this.setState({
          guitar: guitar
        })
      }).catch(error => console.log(error))
    } else {
      this.setState({
        guitar: this.props.location.state.guitar
      })
    }
  }
  render(){

    return(
      <div>
      <NavLink
        to={{pathname: `/users/${this.state.guitar.user}`}}>
        {this.state.guitar.user}
        </NavLink>
      <p>{this.state.guitar.model}</p>
      </div>
    )
  }
}

export default withRouter(Guitar)
