import React, { Component } from "react";
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'
import './common.css'
import Loading from './Loading'
import {Link} from "react-router-dom";
import HereMap from './StaticMap'
import MediaCard from './Card'


class Home extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            loading : true,
            center : {
                lat : null,
                lng: null,
            }
        }

        this.locationListener = this.locationListener.bind(this)
    }

    componentDidMount()
    {
        this.setState({
            loading : true
        })

        this.props.getCurrentUser();
        this.locationListener();

        this.setState({
            loading : false
        })
    }

    locationListener()
      {
        if(navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    center : {
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                    }
                })
            })
        }
        
        else {
            console.error("Geolocation is not supported by this browser!");
        }

    }

    render()
    {

        if(this.props.loading || this.state.loading)
        {
            return(
                <Loading />
            )
        }

        if (this.props.currentUser && this.props.currentUser != null)
        {
            return (
                <div>
                    <Navbar currentUser = {this.props.currentUser}/>
                    
                    <div className="row">
                        <div className = "col-lg-5 col-md-12 col-sm-12 col-xs-12 text-center fill row1">
                            <img src = "./img_1.jpg"></img>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 text-center px-auto py-5 row1" >
                            <h2 className="heading my-2"><span className = "color1">Welcome, </span><span className = "color3"> User!</span></h2>
                            <span className = "color1 subheading">
                            <h4 className="my-5">Feeling hungry? We have got you covered ;)</h4>
                                <div className="my-5 mx-5 px-5">Explore local food stalls in your neighbourhood, or recommend a new food stall you have discovered !</div>
                            <Link to = "/search">
                                <b className="button2 mx-2">Explore</b>
                            </Link>
                            <Link to = "/newRestaurant">
                                <b className="button2 mx-2">Contribute</b>
                            </Link>
                            </span>
                        </div>

                        <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 text-center px-auto py-5 row2" >
                            <h2 className="heading my-2"><span className = "color5">Explore your </span><span className = "color3">neighbourhood</span></h2>
                            <span className = "color5 subheading">
                            <h4 className="my-5">Don't miss out on famous street food in your locality! </h4>
                                <div className="my-5 mx-5 px-5">Check out and pay a visit to some never-heard before food stalls, and give your taste buds a treat. Click on the button below to continue</div>
                            <Link to = "/search">
                                <b className="button2 mx-2">CHECK MAP</b>
                            </Link>
                            </span>
                        </div>

                        <div className = "col-lg-5 col-md-12 col-sm-12 col-xs-12 row2">
                        <HereMap
                            apikey = {process.env.REACT_APP_API_KEY_HEREMAP}
                            lat={this.state.center.lat}
                            lng= {this.state.center.lng}
                            zoom="12"
                            theme={this.state.theme}/>
                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center px-auto py-5 row1" >
                            <h2 className="heading my-2"><span className = "color3">TOP </span><span className = "color1">RATED</span></h2>
                            <span className = "color1 subheading">
                                <div className="mt-3 mx-5">The best of the best</div>
                            </span>
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row1 pb-5">
                            <div className = "mx-4">
                            <MediaCard />
                            </div>
                            
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row1 pb-5">
                        <div className = "mx-4">
                            <MediaCard />
                            </div>
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row1 pb-5">
                        <div className = "mx-4">
                            <MediaCard />
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center px-auto pb-5 row1" >
                            <Link to = "/search">
                                    <b className="button2 mx-2">VIEW MORE</b>
                                </Link>
                        </div>




                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center px-auto py-5 row2" >
                            <h2 className="heading my-2"><span className = "color3">NEAR </span><span className = "color5">ME</span></h2>
                            <span className = "color5 subheading">
                                <div className="mt-3 mx-5">Just within your walking distance</div>
                            </span>
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row2 pb-5">
                            <div className = "mx-4">
                            <MediaCard />
                            </div>
                            
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row2 pb-5">
                        <div className = "mx-4">
                            <MediaCard />
                            </div>
                        </div>

                        <div className = "col-lg-4 col-md-12 col-sm-12 row2 pb-5">
                        <div className = "mx-4">
                            <MediaCard />
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center px-auto pb-5 row2" >
                            <Link to = "/search">
                                    <b className="button2 mx-2">VIEW MORE</b>
                                </Link>
                        </div>
                        
                        

                    </div>
                        
                    </div>
            )
        }

        return (
            <div>
                <Navbar currentUser = {this.props.currentUser}/>
                
                <div className = "container center my-5">

                    <div className = "row">
                        <h1>About</h1>
                    </div>

                    <div className = "row">
                        <h1>Contribue</h1>
                    </div>

                    <div className = "row">
                        <h1>Search</h1>
                    </div>

                    <div className = "row">
                        <h1>Footer</h1>
                    </div>
                </div>
            </div>
            
        );
    }
};




const mapDispatchToProps = (dispatch) =>{
    return {
        getCurrentUser : () => dispatch(getCurrentUser()),
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser : state.auth.currentUser,
        loading : state.auth.loading,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);