import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class GuitarEditForm extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const {userId, guitarId} = this.props.match.params
        this.props.guitars.find(guitar => {
            if(guitar.user_id === parseInt(userId) && guitar.id === parseInt(guitarId)) { 
                console.log(guitar)
                return guitar
              }
        })
    }

    render(){
        return(
            <div>
            {this.props.currentUser.username ?  
            <p>GuitarEditForm</p> :
               <Redirect to='/' />
            }
       </div>
        )
    }
}

export default withRouter(GuitarEditForm) 