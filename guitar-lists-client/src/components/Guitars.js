import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Guitars extends Component {

  render(){
    let url;
    return(
      <div className="container" id="guitars">
        {this.props.guitars.map(guitar => {
            url=`/users/${guitar.user_id}/guitars/${guitar.id}`
            return <NavLink
              key={guitar.id} 
              exact
              activeClassName = 'active-link'
              className = 'home navbar-brand d-block'
              to={{pathname: url, state: {guitar: guitar}}}>
              {guitar.model}
            </NavLink>
          })
        }

      </div>
    )
  }
}

export default Guitars
