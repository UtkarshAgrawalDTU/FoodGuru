import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import firebase from 'firebase/app'
import 'firebase/storage';
import Loading from './Loading'
import './common.css'
import Chip from '@material-ui/core/Chip'
import HereMap from './StaticMap'

class NewRestaurant extends Component {
    
    fileObj = [];
    fileArray = [];
    
    componentDidMount()
    {
        this.setState({
            loading : true
        })

        this.locationListener()
        this.props.getCurrentUser()
        this.file = [null]

        this.setState({
            loading : false
        })

        this.setRef = ref => {
            this.file = ref;
        }
    }

    constructor(props)
    {
        super(props);
        
        this.state  = {
            file: [null],
            loading : true,
            error : null,
            success : null,
            one_speciality : "",
            restaurant_details : {
                name : "",
                photoUrls : []
            },
            center : {
                lat : null,
                lng: null,
            },
            review_details : {
                ratings: {
                    cleanliness: "5",
                    food: "5",
                    overall_rating: "5",
                    parking: "5",
                    service: "5",
                },

                review : "",
                speciality : [],
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRestaurantChange = this.handleRestaurantChange.bind(this)
        this.handleReviewRatingsChange = this.handleReviewRatingsChange.bind(this)
        this.handleReviewChange = this.handleReviewChange.bind(this)
        this.one_speciality = this.one_speciality.bind(this)
        this.addSpeciality = this.addSpeciality.bind(this)
        this.removeSpeciality = this.removeSpeciality.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.locationListener = this.locationListener.bind(this)

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

    handleRestaurantChange(e)
    {
        this.setState(prevState => {
            return {
                ...prevState,
                restaurant_details : {
                    name : e.target.value,
                    photoUrls : prevState.restaurant_details.photoUrls,
                }
            }
        })
    }

    handleReviewRatingsChange(e)
    {
        this.setState(prevState => {
            return {
                ...prevState,

                review_details : {
                    ratings : {
                        ...prevState.review_details.ratings,
                        [e.target.name] : e.target.value
                    },
                    review : prevState.review_details.review,
                    speciality : prevState.review_details.speciality,
                }
            }
        })
    }

    handleReviewChange(e)
    {
        this.setState(prevState => {
            return {
                ...prevState,

                review_details : {
                    ratings : prevState.review_details.ratings,
                    review : [e.target.value],
                    speciality : prevState.review_details.speciality,
                }
            }
        })
    }


    addSpeciality(event){

        
        const newSpeciality = this.state.review_details.speciality.concat(this.state.one_speciality)

        this.setState(prevState => {
            return {
                ...prevState,

                review_details : {
                    ratings : prevState.review_details.ratings,
                    review : prevState.review_details.review,
                    speciality : newSpeciality,
                }
            }
        })

    }



    removeSpeciality(label){
        
        const index = this.state.review_details.speciality.indexOf(label);

        if (index > -1) {
            var newSpeciality = []
            newSpeciality = this.state.review_details.speciality
            newSpeciality.splice(index, 1);

            this.setState(prevState => {
                return {
                    ...prevState,
    
                    review_details : {
                        ratings : prevState.review_details.ratings,
                        review : prevState.review_details.review,
                        speciality : newSpeciality,
                    }
                }
            })
        }
    }


    one_speciality(event)
    {
        this.setState({
            one_speciality : event.target.value,
        })
    }


    //error here
    handleSubmit(event)
    {
        event.preventDefault()
        var db = firebase.firestore();

        if(this.state.center.lat != null)
        {
            db.collection("restaurant").add({
                identified_by : this.props.currentUser.email,
                name: this.state.restaurant_details.name,
                photoUrls : this.state.restaurant_details.photoUrls,
                ratings: this.state.review_details.ratings,
                timestamp : firebase.firestore.Timestamp.now(),
                coords : new firebase.firestore.GeoPoint(this.state.center.lat, this.state.center.lng),
                total_reviews : 1
            })
            .then((docRef) => {
                const id = docRef.id;
                db.collection("reviews").add({
                    image_url : this.state.restaurant_details.photoUrls,
                    ratings: this.state.review_details.ratings,
                    review: this.state.review_details.review,
                    speciality: this.state.review_details.speciality,
                    restaurant: id,
                    user: this.props.currentUser.email,
                    timestamp : firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                    this.setState({
                        loading : false,
                        error: false,
                        success : true,
                    })
                })
                .catch((error) => {
                    this.setState({
                        loading : false,
                        error: error
                    })
                });
            })
            .catch((error) => {
                this.setState({
                    loading : false,
                    error: error
                })
            });
        }
        
    }


    uploadMultipleFiles(e) {
        this.fileObj = []
        this.fileArray = []
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        this.setState({
            loading : true
        })
        var storageRef = firebase.storage().ref();
        var restRef = storageRef.child('restaurant/')
        
        for (let i = 0; i < this.fileObj[0].length; i++) {
            const file = this.fileObj[0][i];
            const mainImage = restRef.child(file.name);
            var err = false;

            mainImage.put(file)
            .then(snapshot => {
                mainImage.getDownloadURL()
                .then(url => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            restaurant_details : {
                                name : prevState.restaurant_details.name,
                                photoUrls : prevState.restaurant_details.photoUrls.concat(url)
                            }
                        }
                    })
                })
                .catch(error => {
                    err = error;
                })
            })
            .catch(error => {
                err = error;
            })
        }

        this.setState({
            loading : false
        })

    }




    render()
    {
        console.log(this.props, this.state);
        const ChipObj = this.state.review_details.speciality.map(item => <Chip key={item} label = {item} onDelete = {() => this.removeSpeciality(item)}/> )
        var error = (this.state.error != null && this.state.error != false) || (this.props.error != null && this.props.error != "No logged in user")? 
        (<div class="alert alert-danger my-2" role="alert">
            <strong>An error occured, please try again</strong>
        </div>) : <div /> 

        if(this.props.loading || this.state.loading)
        {
            return(
                <Loading />
            )
        }

        if(this.props.currentUser === null)
        {
            return <Redirect to = "/" />
        }

        if(this.state.success == true)
        {
            return <Redirect to = "/" />
        }
        
        else
        {
            return(
                <div className = "Home">
                    <Navbar currentUser = {this.props.currentUser}/>
                    <div className = "row">
                        <div className = "col-lg-6 col-md-6 d-md-block d-sm-none d-none">
                        <HereMap
                            apikey= "UXLkRChcRiPgtuU9dGgOamUae8XHGdOIIhpCIgNaTyk"
                            lat={this.state.center.lat}
                            lng= {this.state.center.lng}
                            zoom="12"
                            theme={this.state.theme}/>
                        </div>

                        <div className = "col-lg-6 col-md-6">

                        <div className = "my-5 container">

                        <h2>New Restaurant</h2>
                        <div>
                                <form>
                                <div class="form-group">
                                    <label for="RestaurantName">Name</label>
                                    <input name = "name" type="text" class="form-control" id="RestaurantName" placeholder = {this.state.restaurant_details.name} onChange = {this.handleRestaurantChange} />
                                </div>

                                <div className="form-group multi-preview">
                                <label for="RestaurantImages">Images</label>
                                <br></br>
                                    {(this.fileArray || []).map(url => (
                                        <img width = "100px" height = "100px" src={url} alt="..." />
                                    ))}
                                </div>

                                <div className="form-group">
                                    <input id = "RestaurantImages" type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                                </div>
                                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>

                                <label for="customRange1" className="form-label">Cleanliness</label>
                                    <input name = "cleanliness" type="range" className="form-range" min="1" max="5" step="1" id="customRange1" placeholder = {this.state.review_details.ratings.cleanliness} onChange = {this.handleReviewRatingsChange}></input>
                                    <br></br>

                                <label for="customRange2" className="form-label">Food</label>
                                    <input name = "food" type="range" className="form-range" min="1" max="5" step="1" id="customRange2" placeholder = {this.state.review_details.ratings.food} onChange = {this.handleReviewRatingsChange}></input>
                                    <br></br>

                                <label for="customRange3" className="form-label">Parking</label>
                                    <input name = "parking" type="range" className="form-range" min="1" max="5" step="1" id="customRange3" placeholder = {this.state.review_details.ratings.parking} onChange = {this.handleReviewRatingsChange}></input>
                                    <br></br>

                                <label for="customRange4" className="form-label">Service</label>
                                    <input name = "service" type="range" className="form-range" min="1" max="5" step="1" id="customRange4" placeholder = {this.state.review_details.ratings.service} onChange = {this.handleReviewRatingsChange}></input>
                                    <br></br>

                                <label for="customRange5" className="form-label">Overall Rating</label>
                                    <input name = "overall_rating" type="range" className="form-range" min="1" max="5" step="1" id="customRange5" placeholder = {this.state.review_details.ratings.overall_rating} onChange = {this.handleReviewRatingsChange}></input>
                                
                                <div className="mb-3">
                                    <label for="Textarea1" className="form-label">Review</label>
                                    <textarea name = "review" className="form-control" id="Textarea1" rows="3" placeholder = {this.state.review_details.review} onChange = {this.handleReviewChange}></textarea>
                                </div>


                                <div className="input-group input-group-md mb-3">
                                    <input name= "speciality" value = {this.state.one_speciality} onChange={this.one_speciality} type="text" className="form-control" placeholder="Speciality" aria-label="Add your ingredients here" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-dark" type="button" onClick = {this.addSpeciality}>Add</button>
                                        <br></br>
                                    </div>
                                </div>
                                {ChipObj}
                                <br></br>
                                <br></br>


                                <button type="button" className="btn btn-primary my-2" onClick = {this.handleSubmit}>Submit</button>

                                <br></br>
                                <br></br>

                                {error}

                                </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurant)