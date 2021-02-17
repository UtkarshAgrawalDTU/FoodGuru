import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'


class Profile extends Component {
  
    componentDidMount()
    {
        this.setState({
            loading : true
        })

        this.props.getCurrentUser();

        this.setState({
            loading : false
        })
    }

    constructor(props)
    {
        super(props);
        this.state  = {
            loading : true
        };
        
    }
  
    render()
    {
        console.log(this.props, this.state);

        if(this.props.loading || this.state.loading)
        {
            return(
                <div className = "Home">
                    <Navbar />
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
                    <Navbar />
                    <h2>Profile</h2>
                    <h3>{this.props.currentUser.email}</h3>
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