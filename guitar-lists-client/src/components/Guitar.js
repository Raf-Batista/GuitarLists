import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Guitar extends Component {
  constructor(props) {
    super(props)
    this.state = {guitar: '', errors: '', message: ''}
  }
  componentDidMount(){
    this.props.guitars.find(guitar => {
      if(guitar.id === parseInt(this.props.match.params.guitarId) && guitar.user_id === parseInt(this.props.match.params.userId)) {
        this.setState({ guitar: guitar })
      }
    })
  }

  handleEdit = () => {
    const {userId, guitarId} = this.props.match.params 
    this.props.history.push({
      pathname: `/users/${userId}/guitars/${guitarId}/edit`,
      state: {guitar: this.state.guitar}
    })     
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.deleteGuitar(this.props.currentUser, parseInt(this.props.match.params.guitarId), this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleEmail = (event) => {
    event.preventDefault() 
    if(window.confirm('Send Email to this Seller?')) {
      fetch('http://localhost:3000/message', {
        method: 'POST',
        body: JSON.stringify({message: this.state.message, seller: this.props.match.params.userId , guitar: this.state.guitar, user: this.props.currentUser, token: localStorage.getItem('token')}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(console.log('success'))
      .catch(errors => console.log(errors))
    }
    this.setState({
      message: ''
    })
  }
  
  render(){ 
    return(
     <div className="container">
        <div className="jumbotron text-center">
          { // If state has a guitar then render div with guitar info. If not return null.
            this.state.guitar ? 
            <div>
              <h1>Model: {this.state.guitar.model}</h1>
              <p>Spec: {this.state.guitar.spec}</p>
              <p>Price: {this.state.guitar.price}</p>
              <p>Condition: {this.state.guitar.condition}</p>
              <p>Location: {this.state.guitar.location}</p>
            </div> : null
          }

          { // If logged in user id is the same as the id in params, render edit and delete buttons
            this.props.currentUser.id === parseInt(this.props.match.params.userId) ? 
            <div>
              <button className="btn btn-primary btn-small ml-2" onClick={this.handleEdit}>Edit</button>
              <button className="btn btn-primary btn-small ml-2" onClick={this.handleDelete}>Delete</button>
            </div> : null
          }

          { // if logged in and id does not equal the user id in params, render form to email seller
            this.props.currentUser.id && this.props.currentUser.id !== parseInt(this.props.match.params.userId) ? 
            <form onSubmit={this.handleEmail}>
              <label htmlFor="message" name="message">Message:</label>
              <input className="ml-2 mt-2" type="text" name="message" onChange={this.handleChange} value={this.state.message} required/>
              <button className="btn btn-primary btn-sm ml-2" type="submit">Email</button>
            </form>  : null
          }
        </div>
     </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    guitars: state.guitars
  }
}

export default withRouter(connect(mapStateToProps)(Guitar))
