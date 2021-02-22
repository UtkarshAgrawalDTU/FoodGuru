import React , {Component} from 'react';
import {connect} from 'react-redux'
import {loginUser} from '../store/actions/authActions'
import {Redirect} from "react-router-dom";
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import Loading from './Loading'
import './common.css'


class Login extends Component {
  
    constructor(props)
    {
        super(props)
        this.state = {
            loading : true,
            email : "",
            password : ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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


    handleChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.props.loginUser({
                email : this.state.email,
                password : this.state.password
        })
    }
  
    render()
  {
    var error = this.props.error != null && this.props.error != "No logged in user"? 
    (<div class="alert alert-danger my-2" role="alert">
        <strong>Error logging in</strong>
    </div>) : <div /> 

        if(this.props.loading || this.state.loading)
        {
            return(
                <Loading />
            )
        }


    if (this.props.currentUser && this.props.currentUser != null)
    {
        return <Redirect to = "/" />
    }

      return(

        <div className = "body">
            <Navbar currentUser = {this.props.currentUser} />

            <div className = "container center my-5">

                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" id = "email" value = {this.state.email} onChange = {this.handleChange} class="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange} class="form-control" placeholder="Password" />
                </div>

                {error}

                <button type="submit" class="btn btn-primary" onClick = {this.handleSubmit} >Submit</button>


                </form>

            </div>
        </div>
      )
  }
    
  
}

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
        loginUser : (credentials) => dispatch(loginUser(credentials)),
        getCurrentUser : () => dispatch(getCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)