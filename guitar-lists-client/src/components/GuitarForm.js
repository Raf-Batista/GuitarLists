import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class GuitarForm extends Component {
  render(){
    return(
      <div>
        {
          this.props.currentUser.username ?
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
