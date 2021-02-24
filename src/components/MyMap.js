import React, { Component } from "react";
import Navbar from './Navbar'
import HereMap from './Map'
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'
import Loading from './Loading'
import {Redirect} from "react-router-dom";


class MyMap extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            theme: 'normal.day',
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
                <div className = "Home">
                    <Loading />
                </div>
            )
        }

        if(this.props.currentUser === null)
        {
            return <Redirect to = "/" />
        }

        return (
            <div>
                <Navbar currentUser = {this.props.currentUser}/>
                <HereMap
                    apikey= "UXLkRChcRiPgtuU9dGgOamUae8XHGdOIIhpCIgNaTyk"
                    lat="20"
                    lng="40"
                    zoom="12"
                    theme={this.state.theme}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyMap);