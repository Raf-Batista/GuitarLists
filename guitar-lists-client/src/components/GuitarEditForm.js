import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class GuitarEditForm extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }

    render(){
        return(
            <div>
                 {this.props.currentUser.username ?  <p>GuitarEditForm</p> :
                    <Redirect to='/' />
                 }
            </div>
        )
    }
}

export default withRouter(GuitarEditForm) 