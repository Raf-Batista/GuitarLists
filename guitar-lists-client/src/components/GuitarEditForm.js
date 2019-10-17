import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class GuitarEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = { guitar: {model: '', spec: '', price: '', condition: '', location: ''} }
    }

    componentDidMount() {
        this.props.guitars.find(guitar => {
            if(guitar.user_id === this.props.currentUser.id && guitar.id === parseInt(this.props.match.params.guitarId)) {
                this.setState({
                    guitar: guitar
                })
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
        this.props.editGuitar(this.state.guitar, this.props.history, this.props.currentUser)
    }

    render(){
        return(
            <div className="container">
                {this.props.currentUser.username ?  // renders form if logged in
                <div className="jumbotron text-center">
                    <h1>Edit Guitar</h1>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label" name="model" >Model:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="model" type="text" value={this.state.guitar.model} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label" name="spec" >Spec:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="spec" type="text" value={this.state.guitar.spec} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label" name="price" >Price:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="price" type="text" value={this.state.guitar.price} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label" name="condition" >Condition:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="condition" type="text" value={this.state.guitar.condition} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label" name="location" >Location:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="location" type="text" value={this.state.guitar.location} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                    <input className="btn btn-primary" type="submit" value="Edit" />
                </div>

                    </form>
                </div> :
            null 
            /* 
              this line was <Redirect to='/' />, if user enters URL through browser the user was redirected, with null the page 
                refreshes but you can enter any user id in url and page will still load
            */
            }
       </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        guitars: state.guitars
    }
  }
  
  export default withRouter(connect(mapStateToProps)(GuitarEditForm))
  