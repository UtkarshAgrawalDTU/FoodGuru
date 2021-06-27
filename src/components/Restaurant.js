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
import ImageGridList from './ImageGridList'
import VirtualisedList from './ReviewList'

function union_arrays (x, y) {
    var obj = {};
    for (var i = x.length-1; i >= 0; -- i)
       obj[x[i]] = x[i];
    for (var i = y.length-1; i >= 0; -- i)
       obj[y[i]] = y[i];
    var res = []
    for (var k in obj) {
      if (obj.hasOwnProperty(k))  // <-- optional
        res.push(obj[k]);
    }
    return res;
  }



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
            var temp = []
            for(var i = this.state.review_details.length-1; i >= 0; -- i)
            {
                var newarr = this.state.review_details[i].image_url;
                temp = temp.concat(newarr);
            }
                
            var images = union_arrays(this.state.restaurant_details.photoUrls, temp);

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
                                    <div className = "center mx-3 my-4">
                                    <ImageGridList images = {images}/>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className = "col-lg-6 col-md-12 col-sm-12 col-xs-12 row2">
                        <HereMap
                            apikey= {process.env.REACT_APP_API_KEY_HEREMAP}
                            lat={this.state.restaurant_details.coords.x_}
                            lng= {this.state.restaurant_details.coords.N_}
                            zoom="12"
                            theme={this.state.theme}/>
                        </div>

                            <div className = "col-lg-12 row2">
                                <div className = "center">
                                <h2 className="subheading my-5"><span className = "color5">Reviews</span></h2>
                                <div className = "my-5 mx-5">
                                    <VirtualisedList reviews = {this.state.review_details}/>
                                </div>
                                </div>
                                
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