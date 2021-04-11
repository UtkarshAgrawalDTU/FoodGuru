import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import firebase from 'firebase/app'
import 'firebase/storage';
import Loading from './Loading'
import './common.css'


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
            form_details : {
                name: "",
                photoUrl : "",
            }
        };

        this.upload = this.upload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e)
    {

        this.setState(prevState => {
            return {
                ...prevState,
                form_details : {
                    name : e.target.value,
                    photoUrl : prevState.form_details.photoUrl,
                }
            }
        })
    }



    handleSubmit(event)
    {
        event.preventDefault();

        this.setState({
            loading : true
        })
        var db = firebase.firestore();

        if(this.state.form_details.photoUrl == "")
        {
            db.collection("users").doc(this.props.currentUser.email).update({
                username : this.state.form_details.name
            })
            .then(() => {
                console.log("Updated user profile")
                this.setState({
                    loading : false,
                    error: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading : false,
                    error: true,
                })
            })
        }

        else{
            db.collection("users").doc(this.props.currentUser.email).update({
                photoUrl : this.state.form_details.photoUrl,
                username : this.state.form_details.name
            })
            .then(() => {
                console.log("Updated user profile")
                this.setState({
                    loading : false,
                    error: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading : false,
                    error: true,
                })
            })
        }
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
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            form_details : {
                                name : prevState.form_details.name,
                                photoUrl : url
                            }
                        }
                    })
                    console.log(url);
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
        })

    }
  


    render()
    {
        console.log(this.props, this.state);

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

        if(this.state.error == false)
        {
            return <Redirect to = "/profile" />
        }
        
        else
        {
            return(
                <div className = "Home">
                    <Navbar currentUser = {this.props.currentUser}/>
                    <div className = "container my-5 center">

                    <h2>Update Profile</h2>
                    <div className = "container">
                            <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {this.props.currentUser.email} readonly />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Full Name</label>
                                <input name = "name" type="text" class="form-control" id="exampleInputPassword1" placeholder = {this.props.currentUser.name} onChange = {this.handleChange} />
                            </div>
                            
                            <input className ="form-control-file" type = "file" ref = {this.setRef} />
                            <br></br>
                            <button type="button" className="btn btn-primary my-2" onClick = {this.upload}>Upload Image</button>
                            <br></br>
                            <button type="button" className="btn btn-primary my-2" onClick = {this.handleSubmit}>Update Profile</button>
                            </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)