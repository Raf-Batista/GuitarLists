import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

  handleClick = () => {
    const {userId, guitarId} = this.props.match.params 
    this.props.history.push(`/users/${userId}/guitars/${guitarId}/edit`)
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleEmail = (event) => {
    event.preventDefault()
  }

  render(){
    return(
      <div>
        {
          this.state.errors ? <p>{this.state.errors}</p> : // render errors if guitar not found or doesn't belong to user
          <div>
            <p>{this.state.guitar.model}</p>
            <p>{this.state.guitar.spec}</p>
            <p>{this.state.guitar.price}</p>
            <p>{this.state.guitar.condition}</p>
            <p>{this.state.guitar.location}</p>
            {this.props.currentUser.id === parseInt(this.props.match.params.userId) ? 
              <button onClick={this.handleClick}>Edit</button> : 
              <form onSubmit={this.handleEmail}>
                <label htmlFor="message" name="message">Message:</label>
                <input type="text" name="message" onChange={this.handleChange} value={this.state.message} />
                <button type="submit">Email</button>
              </form>
            }
            
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Guitar)
