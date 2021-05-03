import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import firebase from 'firebase/app'
import 'firebase/storage';
import {Link} from "react-router-dom";
import './Profile.css'
import Loading from './Loading'
import Rating from '@material-ui/lab/Rating';
import './common.css'
import HereMap from './StaticMap'

class Restaurant extends Component {
  
    componentDidMount()
    {
        this.setState(prevState => {
            return {
                ...prevState,
                loading : prevState.loading + 1,
            } 
        })

        this.props.getCurrentUser();
        this.getRestaurant();

        this.setState(prevState => {
            return {
                ...prevState,
                loading : prevState.loading - 1,
            } 
        })

    }

    constructor(props)
    {
        super(props);
        this.state  = {
            loading : 0,
            error : null,
            restaurant_details : null,
            review_details : null,
        };

        this.getRestaurant = this.getRestaurant.bind(this)
    }

    getRestaurant()
    {
        this.setState(prevState => {
            return {
                ...prevState,
                loading : prevState.loading + 1,
            } 
        })

        var db = firebase.firestore();

        const id = this.props.match.params.id;
        var docRef = db.collection("restaurant").doc(id);
        var review_details = []
        docRef.get().then((doc) => {
            if (doc.exists) {
                const restaurant_details = doc.data()
                console.log(doc.data())
                db.collection("reviews").where("restaurant", "==", id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        review_details.push({
                            id : doc.id,
                            data: doc.data(),
                        });
                    });
                    
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            restaurant_details : restaurant_details,
                            review_details : review_details,
                            loading : prevState.loading - 1,
                            error : false, 
                        } 
                    })
                })
                .catch((error) => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            loading : prevState.loading - 1,
                            error : true, 
                        } 
                    })
                });
            } else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loading : prevState.loading - 1,
                        error : true, 
                    } 
                })
            }
        }).catch((error) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading : prevState.loading - 1,
                    error : true, 
                } 
            })
        });
    }

  
    render()
    {
        console.log(this.state, this.props)
        if(this.props.loading || this.state.loading >= 1)
        {
            return(
                <div className = "Home">
                    <Loading />
                </div>
            )
        }

        if(this.props.currentUser === null || this.state.restaurant_details == null)
        {
            return <Redirect to = "/" />
        }
        
        else
        {
            var src = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
            if(this.props.currentUser.photoUrl != "" && this.props.currentUser.photoUrl != null)
            {
                src = this.props.currentUser.photoUrl;
            }

            return(

                <div>
                    <Navbar currentUser = {this.props.currentUser}/>

                    <div className="row">
                        <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5 text-center fill row1">
                            <h2 className="heading my-2"><span className = "color3"> {this.state.restaurant_details.name}</span></h2>
                        </div>

                            <div className = "col-lg-3 col-md-12 col-sm-12 col-xs-12 row1">
                                <div className = "mb-5 center">
                                <Rating name="half-rating-read" defaultValue={this.state.restaurant_details.ratings.cleanliness} precision={0.1} readOnly />
                                <h5 className = "subheading my-1 color1">Cleanliness</h5>
                                </div>
                            </div>


                            <div className = "col-lg-2 col-md-12 col-sm-12 col-xs-12 row1">
                                <div className = "mb-5 center">
                                <Rating name="half-rating-read" defaultValue={this.state.restaurant_details.ratings.food} precision={0.1} readOnly />
                                <h5 className = "subheading my-1 color1">Food</h5>
                                </div>
                            </div>

                            <div className = "col-lg-2 col-md-12 col-sm-12 col-xs-12 row1">
                                <div className = "mb-5 center">
                                <Rating name="half-rating-read" defaultValue={this.state.restaurant_details.ratings.overall_rating} precision={0.1} readOnly />
                                <h5 className = "subheading my-1 color1">Overall Rating</h5>
                                </div>
                            </div>

                            <div className = "col-lg-2 col-md-12 col-sm-12 col-xs-12 row1">
                                <div className = "mb-5 center">
                                <Rating name="half-rating-read" defaultValue={this.state.restaurant_details.ratings.parking} precision={0.1} readOnly />
                                <h5 className = "subheading my-1 color1 center">Parking</h5>
                                </div>
                            </div>

                            <div className = "col-lg-3 col-md-12 col-sm-12 col-xs-12 row1">
                                <div className = "mb-5 center">
                                <Rating name="half-rating-read" defaultValue={this.state.restaurant_details.ratings.service} precision={0.1} readOnly />
                                <h5 className = "subheading my-1 color1">Service</h5>
                                </div>
                            </div>

                            <div className = "col-lg-6 col-md-12 row2">
                                <div className = "center">
                                    <h3 className = "subheading my-5 color5">Photos</h3>

                                </div>
                            </div>

                            <div className = "col-lg-6 col-md-12">
                                <div className = "center">
                                    <h3 className = "subheading my-5 color5">Location</h3>
                                    <div className = "mx-3 my-3">
                                    <HereMap
                                        apikey= "UXLkRChcRiPgtuU9dGgOamUae8XHGdOIIhpCIgNaTyk"
                                        lat= {this.state.restaurant_details.coords.x_}
                                        lng= {this.state.restaurant_details.coords.N_}
                                        zoom="12"
                                        theme={this.state.theme}/>
                                    </div>

                                </div>

                            </div>

                            <div className = "col-lg-12 color5">
                            </div>


                    </div>
    
                </div>


            )
        }
        
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getCurrentUser : () => dispatch(getCurrentUser())
    }
}



const mapStateToProps = (state) => {
    return {
        currentUser : state.auth.currentUser,
        loading : state.auth.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant)