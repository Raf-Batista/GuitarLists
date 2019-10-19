import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Guitars extends Component {

  render(){
    return(
      <div className="container" id="guitars">
        {this.props.guitars.map(guitar => {
            return <NavLink
              key={guitar.id} 
              exact
              activeClassName = 'active-link'
              className = 'home navbar-brand d-block'
              to={`/users/${guitar.user_id}/guitars/${guitar.id}`}>
              {guitar.model}
            </NavLink>
          })
        }
      </div>
    )
  }
}

export default Guitars
