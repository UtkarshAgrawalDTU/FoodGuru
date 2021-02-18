import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import {signoutUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import Loading from './Loading'

class Signout extends Component {
  
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

        this.props.signoutUser();

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


        else if (this.props.error)
        {
            return <Redirect to = "/" />
        }

        else
        {
            return <Redirect to = "/" />
        }
        
    }
};



const mapStateToProps = (state) => {
    return {
        currentUser : state.auth.currentUser,
        loading : state.auth.loading,
        error : state.auth.error,
        success : state.auth.success
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signoutUser : () => dispatch(signoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)