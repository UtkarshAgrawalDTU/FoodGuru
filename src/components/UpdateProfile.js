import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import firebase from 'firebase/app'
import 'firebase/storage';


class UpdateProfile extends Component {
  
    componentDidMount()
    {
        this.setState({
            loading : true
        })

        this.props.getCurrentUser()
        this.file = null

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
            loading : true,
            error : null,
            // form_details : {
            //     name: "",
            //     email : "",
            // }
        };

        this.upload = this.upload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleSubmit(event)
    {
        event.preventDefault();
    }


    upload(event)
    {
        
        event.preventDefault();
        this.setState({
            loading : true,
        })

        if(this.file != null)
        {
            var storageRef = firebase.storage().ref();
            var profileRef = storageRef.child('profile/')
            const file = this.file.files[0];
            const mainImage = profileRef.child(this.file.files[0].name);
            var err = false;
            var db = firebase.firestore();

            mainImage.put(file)
            .then(snapshot => {
                mainImage.getDownloadURL()
                .then(url => {
                    console.log(url);
                    db.collection("users").doc(this.props.currentUser.email).update({
                        photoUrl : url
                    })
                    .then(() => {
                        console.log("Updated user profile url")
                        err = false;
                    })
                    .catch((error) => {
                        err = error;
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
            loading : false,
            error : err,
        })

    }
  


    render()
    {
        console.log(this.props, this.state);

        if(this.props.loading || this.state.loading)
        {
            return(
                <div className = "Home">
                    <h2>Loading</h2>
                </div>
            )
        }

        if(this.props.currentUser === null)
        {
            return <Redirect to = "/" />
        }
        
        else
        {
            return(
                <div className = "Home">
                    <Navbar currentUser = {this.props.currentUser}/>
                    <h2>Profile</h2>
                    <input name = "name" type = "text"  />
                    <input name = "email" type = "text" />
                    <img src = {this.props.currentUser.photoUrl}></img>
                    <input type = "file" ref = {this.setRef} />
                    <button type="button" class="btn btn-primary" onClick = {this.upload}>Update Profile Picture</button>
                    <br />
                    <button type="button" class="btn btn-primary" onClick = {this.upload}>Update Profile</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)