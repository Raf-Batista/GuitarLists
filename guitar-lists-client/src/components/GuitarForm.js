import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class GuitarForm extends Component {
  render(){
    return(
      <div>
        {
          this.props.currentUser.username ? // if user logged in, render form, if not they are redirected to home page
          <div id="guitarForm">
            <form>
              <label>Model:</label>
              <input type="text" />
              <label>Spec:</label>
              <input type="text" />
              <label>Price:</label>
              <input type="text" />
              <label>Condition:</label>
              <input type="text" />
              <label>Location:</label>
              <input type="text" />
              <button type="submit">Post Guitar for sale</button>
            </form>
          </div> :
          <Redirect to='/' />
        }
      </div>
    )
  }
}

export default GuitarForm
