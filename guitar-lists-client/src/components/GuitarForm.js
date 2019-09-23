import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class GuitarForm extends Component {
  render(){
    return(
      <div>
        {
          this.props.currentUser.username ? // if user logged in, render form, if not they are redirected to home page
          <div id="guitarForm">
            Guitar Form
          </div> :
          <Redirect to='/' />
        }
      </div>
    )
  }
}

export default GuitarForm
