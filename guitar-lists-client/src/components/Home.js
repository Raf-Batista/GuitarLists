import React, { Component } from 'react';
import Signup from './Signup';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render(){
    return(
      <div>
        {
          this.props.currentUser.username ? // if a user is found in redux state, redirect them to User's show page, else render signup form
          <Redirect to={`/users/${this.props.currentUser.id}`} /> :
          <div className="container">
            <div className="row">
              <div className="col-8 d-sm-none d-md-block mt-5">
                <div id="guitars" className="carousel slide" data-ride="carousel"> 

                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/guitar-1.jpeg'} />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/guitar-2.jpeg'} />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/guitar-3.jpeg'} />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/guitar-4.jpeg'} />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={process.env.PUBLIC_URL + '/images/guitar-5.jpeg'} />
                    </div>
                  </div>

                    <a class="carousel-control-prev" href="#guitars" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#guitars" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="col-4 mt-5">
               <Signup />
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(Home)
