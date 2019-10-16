import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Guitar extends Component {
  constructor(props) {
    super(props)
    this.state = {guitar: '', errors: '', message: ''}
  }
  componentDidMount(){
    /*
    If user did not come to this page via link, fetch guitar data
    based on id in params, if user came via link there will user data already
    so the else is run which takes data from props passed in to state from NavLink
    */
    if(!this.props.location.state) {
      const {userId, guitarId} = this.props.match.params
      fetch(`http://localhost:3000/users/${userId}/guitars/${guitarId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          guitar: data,
          errors: data.errors
        })
      }).catch(error => console.log(error))
    } else {
      this.setState({
        guitar: this.props.location.state.guitar
      })
    }
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
        {
          this.state.errors ? <p>{this.state.errors}</p> : // render errors if guitar not found or doesn't belong to user
          <div className="jumbotron text-center">
            <h1>Model: {this.state.guitar.model}</h1>
            <p>Spec: {this.state.guitar.spec}</p>
            <p>Price: {this.state.guitar.price}</p>
            <p>Condition: {this.state.guitar.condition}</p>
            <p>Location: {this.state.guitar.location}</p>
            {this.props.currentUser.id === parseInt(this.props.match.params.userId) ? 
              <div>
                <button className="btn btn-primary btn-small ml-2" onClick={this.handleEdit}>Edit</button>
                <button className="btn btn-primary btn-small ml-2" onClick={this.handleDelete}>Delete</button>
              </div> : 
              <form onSubmit={this.handleEmail}>
                <label htmlFor="message" name="message">Message:</label>
                <input className="ml-2 mt-2" type="text" name="message" onChange={this.handleChange} value={this.state.message} required/>
                <button className="btn btn-primary btn-sm ml-2" type="submit">Email</button>
              </form>
            }
            
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {guitars: state.guitars}
}

export default withRouter(connect(mapStateToProps)(Guitar))
