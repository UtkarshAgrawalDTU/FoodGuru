import React, { Component } from "react";
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'
import './common.css'
import Loading from './Loading'



class Home extends Component{

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

        if (this.props.currentUser && this.props.currentUser != null)
        {
            return (
                <div>
                    <Navbar currentUser = {this.props.currentUser}/>
                    <div className = "container center my-5">

                        <div className = "row">
                            <h1>Welcome, User logged in</h1>
                        </div>

                        <div className = "row">
                            <h1>Contribute</h1>
                        </div>

                        <div className = "row">
                            <h1>Near Me</h1>
                        </div>

                        <div className = "row">
                	        <h1>Top Rated</h1>
                        </div>

                        <div className = "row">
                            <h1>Recommended for Me</h1>
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