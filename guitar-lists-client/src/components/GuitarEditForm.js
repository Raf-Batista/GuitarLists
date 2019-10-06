import React, { Component } from 'react';
import { withRouter, Redirect } from 'react';

class GuitarEditForm extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }

    render(){
        return(
            <p>GuitarEditForm</p>
        )
    }
}

export default withRouter(GuitarEditForm) 