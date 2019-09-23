import React, { Component } from 'react';
import Guitars from '../components/Guitars'

class GuitarsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {query: '', guitars: this.props.guitars}
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
      if(guitar.model.includes(lowercasedQuery)) {
        return guitar
      }
    })
    return(
      <div>
        <label>Search</label>
        <input type="text" name="search" onChange={this.handleOnChange} value={this.state.query}/>
        <Guitars guitars={filteredGuitars}/>
      </div>
    )
  }
}

export default (GuitarsContainer)
