import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import createGuitar from '../actions/createGuitar';

class GuitarForm extends Component {
  constructor(props) {
    super(props)
    this.state = {model: '', spec: '', price: '', condition: '', location: ''}
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createGuitar(this.state, this.props.currentUser, this.props.history)

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
      <div className="container">
        {
          this.props.currentUser.username ? // if user logged in, render form, if not they are redirected to home page
          <div className="jumbotron text-center" id="guitarForm">
          <h1>Post a Guitar for Sale</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row mt-5">
                <label className="col-sm-2 col-form-label" name="model" >Model:</label>
                <div className="col-sm-10">
                  <input className="form-control" name="model" type="text" value={this.state.model} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label" name="spec" >Spec:</label>
                <div className="col-sm-10">
                <input className="form-control" name="spec" type="text" value={this.state.spec} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label" name="price" >Price:</label>
                <div className="col-sm-10">
                <input className="form-control" name="price" type="text" value={this.state.price} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label" name="condition" >Condition:</label>
                <div className="col-sm-10">
                <input className="form-control" name="condition" type="text" value={this.state.condition} onChange={this.handleChange}/>
                </div>
              </div>
      
              <div className="form-group row">
                <label className="col-sm-2 col-form-label" name="location" >Location:</label>
                <div className="col-sm-10">
                <input className="form-control" name="location" type="text" value={this.state.location} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="text-center mt-5">
                  <input className="btn btn-primary" type="submit" value="Post" />
              </div>
         
            </form>
          </div> :
          <Redirect to='/' />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {createGuitar})(GuitarForm))
