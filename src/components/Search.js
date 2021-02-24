import React, { Component } from "react";
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'
import './common.css'
import Loading from './Loading'
import {Redirect} from "react-router-dom";



class Search extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            loading : true,
        }
    }

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


    render()
    {

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

        return (
            <div>
                <Navbar currentUser = {this.props.currentUser}/>
                
                <div className = "container center my-5">
                    <h1>Search</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);