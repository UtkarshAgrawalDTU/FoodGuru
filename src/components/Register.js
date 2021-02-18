import React , {Component} from 'react';
import {connect} from 'react-redux'
import {registerUser} from '../store/actions/authActions'
import {Redirect} from "react-router-dom";
import {getCurrentUser} from '../store/actions/authActions'
import Navbar from './Navbar'
import Loading from './Loading'
import {Link} from "react-router-dom";
import './Login.css'

class Register extends Component {
  
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
        super(props)
        this.state = {
            loading : true,
            email : "",
            password : ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.props.registerUser({
            email : this.state.email,
            password : this.state.password
        })
    }
  
    render()
  {

    var error = this.props.error != null && this.props.error != "No logged in user"? 
    (<div class="alert alert-danger" role="alert">
        <strong>Invalid details</strong>
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

      if(this.props.success === "Registration Successful")
      {
          return <Redirect to = "/"/>
      }

      return(

        <div className = "body">
            <Navbar currentUser = {this.props.currentUser} />
            <div class="app">

		    <div class="bg">
            </div>
		    <form>
			<header>
				<img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" />
			</header>

			<div class="inputs">
				<input type="email" id = "email" value = {this.state.email} onChange = {this.handleChange} placeholder = "email" />
				<input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange} placeholder = "password"/>
			</div>
		    </form>

		    <footer>
			<button className = "my-1" onClick = {this.handleSubmit}>Register</button>
            <Link to="/login" style={{ textDecoration: 'none' , color:'black'}}>
			<p>Already have an account? Login Here!</p>
            </Link>

            {error}

		</footer>


	    </div>
        </div>
        // <div className="Register">
        //     <Navbar currentUser = {this.props.currentUser}/>
        //     <h1>Register</h1>

        //     <form method = "POST">
        //         <div className="form-group">
        //             <input type="email" id = "email" value = {this.state.email} onChange = {this.handleChange} className="form-control" aria-describedby="emailHelp" /> 
        //             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        //         </div>

        //         <div class="form-group">
        //             <input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange} className="form-control" />
        //         </div>
                
        //         <button type="submit" className="btn btn-primary" onClick = {this.handleSubmit}>Submit</button>
        //     </form>
        // </div>
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
        registerUser : (credentials) => dispatch(registerUser(credentials)),
        getCurrentUser : () => dispatch(getCurrentUser())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)