import React, { Component } from "react";
import Navbar from './Navbar'
import HereMap from './Map'
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'



class LandingPage extends Component{

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
        this.props.getCurrentUser();
        
        this.setState({
            loading : false
        })
    }


    render()
    {
        
        console.log(this.props)
        return (
            <div>
                <Navbar />
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
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);