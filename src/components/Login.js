import React , {Component} from 'react';
import {connect} from 'react-redux'
import {loginUser} from '../store/actions/authActions'
import {Redirect} from "react-router-dom";
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import Loading from './Loading'
import './Login.css'
import {Link} from "react-router-dom";

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
    (<div class="alert alert-danger" role="alert">
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
            <div class="app">

		    <div class="bg">
            </div>
		    <form method = "POST">
			<header>
				<img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" />
			</header>

			<div class="inputs">
				<input type="email" id = "email" value = {this.state.email} onChange = {this.handleChange} placeholder = "email" />
				<input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange} placeholder = "password"/>
			</div>
		    </form>

		    <footer>
			<button className = "my-1" onClick = {this.handleSubmit}>Login</button>
            <Link to="/register" style={{ textDecoration: 'none' , color:'black'}}>
			<p>Don't have an account? Sign Up</p>
            </Link>

            {error}



		</footer>


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