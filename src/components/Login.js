import React , {Component} from 'react';
import {connect} from 'react-redux'
import {loginUser} from '../store/actions/authActions'
import {Redirect} from "react-router-dom";
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'

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
      console.log(this.props)
    var error = this.props.error != null && this.props.error != "No logged in user"? 
    (<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error logging in</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>) : <div /> 

    if(this.props.loading || this.state.loading)
        {
            return(
                <div className = "Loading">
                    <Navbar />
                    <h2>Loading</h2>
                </div>
            )
        }


    if (this.props.currentUser && this.props.currentUser != null)
    {
        console.log("Already logged in");
        console.log(this.props);
        return <Redirect to = "/" />
    }

      return(
        <div className="Login">
            <Navbar />
            <h1>Login</h1>

            <form method = "POST">
                <div className="form-group">
                    <input type="email" id = "email" value = {this.state.email} onChange = {this.handleChange} className="form-control" aria-describedby="emailHelp" /> 
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange} className="form-control" />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick = {this.handleSubmit}>Submit</button>
            </form>

            {error}
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