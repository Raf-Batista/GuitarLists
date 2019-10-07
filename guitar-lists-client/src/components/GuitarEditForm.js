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

    render(){
        return(
            <div>
            {this.props.currentUser.username ?  
            <form>
                <label htmlFor="model" name="model">Model:</label>
                <input type="text" name="model" />

                <label htmlFor="spec" name="spec">Spec:</label>
                <input type="text" name="spec" />


                <label htmlFor="price" name="price">Price:</label>
                <input type="text" name="price" />


                <label htmlFor="condition" name="condition">Condition:</label>
                <input type="text" name="condition" />

                 
                <label htmlFor="location" name="location">Location:</label>
                <input type="text" name="location" />

                <button type="submit">Edit Guitar</button>
            </form> :
               <Redirect to='/' />
            }
       </div>
        )
    }
}

export default withRouter(GuitarEditForm) 