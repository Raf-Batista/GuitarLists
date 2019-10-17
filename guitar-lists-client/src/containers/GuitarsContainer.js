import React, { Component } from 'react';
import Guitars from '../components/Guitars';
import { connect } from 'react-redux';

class GuitarsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {query: '', guitars: ''}
  }

  handleOnChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }


  render(){
    const {query} = this.state;
    const lowercasedQuery = query.toLowerCase();
    const filteredGuitars = this.props.guitars.filter(guitar => { 
      if(guitar.model.toLowerCase().includes(lowercasedQuery)) {
        return guitar
      }
    })
    return(
      <div className="container">
        <div className="jumbotron text-center">
          <h1>Guitars For Sale</h1>
          <label className="m-2">Search</label>
          <input  type="text" name="search" onChange={this.handleOnChange} value={this.state.query} placeholder="Search for a Guitar"/>
          <Guitars guitars={filteredGuitars} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guitars: state.guitars
  }
}

export default connect(mapStateToProps)(GuitarsContainer)
