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

class Profile extends Component {
  
    componentDidMount()
    {
        this.setState({
            loading : true
        })

        this.props.getCurrentUser();
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

        };
    }

  
    render()
    {
        console.log(this.props, this.state);


        if(this.props.loading || this.state.loading)
        {
            return(
                <div className = "Home">
                    <Loading />
                </div>
            )
        }

        if(this.props.currentUser === null)
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
                    <div class="row py-5 px-4">
                        <div class="col-md-8 mx-auto">
                            <div class="bg-white shadow rounded overflow-hidden">
                                <div class="px-4 pt-0 pb-4 cover">
                                    <div class="media align-items-end profile-head">
                                        <div class="profile mr-3">
                                            <img src= {src} alt="..." width="130" height = "130" class="rounded mb-2 hello" />
                                            <Link to="/profile/update" style={{ textDecoration: 'none'}}>
                                                <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                                            </Link>
                                                </div>
                                            <div class="media-body mb-5 text-white">
                                                <h4 class="mt-0 mb-0">{this.props.currentUser.name}</h4>
                                                <p class="small mb-4"> <i class="fas fa-map-marker-alt mr-2"></i>{this.props.currentUser.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                <div class="bg-light p-4 d-flex justify-content-end text-center">
                                    <ul class="list-inline mb-0">
                                        <li class="list-inline-item">
                                            <h5 class="font-weight-bold mb-0 d-block">215</h5><small class="text-muted"> <i class="fas fa-image mr-1"></i>Photos</small>
                                        </li>
                                        <li class="list-inline-item">
                                            <h5 class="font-weight-bold mb-0 d-block">745</h5><small class="text-muted"> <i class="fas fa-user mr-1"></i>Followers</small>
                                        </li>
                                        <li class="list-inline-item">
                                        <h5 class="font-weight-bold mb-0 d-block">340</h5><small class="text-muted"> <i class="fas fa-user mr-1"></i>Following</small>
                    </li>
                </ul>
            </div>
            
            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="mb-0">Recent photos</h5><a href="#" class="btn btn-link text-muted">Show all</a>
                </div>
                <div class="row">
                    <div class="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 mb-2 pl-lg-1"><img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 pr-lg-1 mb-2"><img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" class="img-fluid rounded shadow-sm" /></div>
                    <div class="col-lg-6 pl-lg-1"><img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" class="img-fluid rounded shadow-sm" /></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)