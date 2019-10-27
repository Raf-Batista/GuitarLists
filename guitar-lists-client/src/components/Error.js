import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Error extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron text-center">
                 <h1>Error</h1>
                 <p>An Error occured, click below to go back</p>
                 <button onClick={this.props.history.goBack}>Go Back</button>
              </div>
            </div>  
          
        )
    }

}

export default withRouter(Error)