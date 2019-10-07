import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class GuitarEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {guitar: ''}
    }
    componentDidMount() {
        const {userId, guitarId} = this.props.match.params
        this.props.guitars.find(guitar => {
            if(guitar.user_id === parseInt(userId) && guitar.id === parseInt(guitarId)) { 
                this.setState({guitar: guitar})
              }
        })
    }

    handleChange = (event) => {
        this.setState({
            guitar: {...this.state.guitar, [event.target.name]: event.target.value}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.editGuitar(this.state.guitar, this.props.history)
    }

    render(){
        return(
            <div>
            {this.props.currentUser.username ?  
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="model" name="model">Model:</label>
                <input type="text" name="model" value={this.state.guitar.model} onChange={this.handleChange}/>

                <label htmlFor="spec" name="spec">Spec:</label>
                <input type="text" name="spec" value={this.state.guitar.spec} onChange={this.handleChange}/>


                <label htmlFor="price" name="price">Price:</label>
                <input type="text" name="price" value={this.state.guitar.price} onChange={this.handleChange}/>


                <label htmlFor="condition" name="condition">Condition:</label>
                <input type="text" name="condition" value={this.state.guitar.condition} onChange={this.handleChange}/>

                 
                <label htmlFor="location" name="location">Location:</label>
                <input type="text" name="location" value={this.state.guitar.location} onChange={this.handleChange}/>

                <button type="submit">Edit Guitar</button>
            </form> :
               <Redirect to='/' />
            }
       </div>
        )
    }
}

export default withRouter(GuitarEditForm) 