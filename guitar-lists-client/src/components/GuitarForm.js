import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class GuitarForm extends Component {
  constructor(props) {
    super(props)
    this.state = {model: '', spec: '', price: '', condition: '', location: ''}
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createGuitar(this.state)
    this.setState({
      model: '', spec: '',
      price: '',
      condition: '',
      location: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render(){
    return(
      <div>
        {
          this.props.currentUser.username ? // if user logged in, render form, if not they are redirected to home page
          <div id="guitarForm">
            <form onSubmit={this.handleSubmit}>
              <label name="model">Model:</label>
              <input name="model" type="text" value={this.state.model} onChange={this.handleChange}/>
              <label name="spec">Spec:</label>
              <input name="spec" type="text" value={this.state.spec} onChange={this.handleChange}/>
              <label name="price">Price:</label>
              <input name="price" type="text" value={this.state.price} onChange={this.handleChange}/>
              <label name="condition">Condition:</label>
              <input name="condition" type="text" value={this.state.condition} onChange={this.handleChange}/>
              <label name="location">Location:</label>
              <input name="location" type="text" value={this.state.location} onChange={this.handleChange}/>
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
