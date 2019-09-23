import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Guitars extends Component {

  render(){
    let url;
    return(
      <div id="guitars">
        {this.props.guitars.map(guitar => {
            url=`guitars/${guitar.id}`
            return <NavLink key={guitar.id} exact 
            activeClassName = 'active-link'
            className = 'home navbar-brand'
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
