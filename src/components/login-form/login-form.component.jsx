// React imports 
import React from 'react';

// Redux imports
import { connect } from 'react-redux';
import {updateLoginEmail, updateLoginPassword, toggleLoginPage} from "../../redux/login/login.actions";

// Import firebase functionality
import { signIn, signOut} from "../../firebase/firebase";

// SASS styles
import "./login-form.styles.scss";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Is called when the input text fields are updated 
    handleChange = event => {
        const value = event.target.value; // The new value of the updated text field

        // Action depends on which field is updated
        if (event.target.id === "email-input") {
          this.props.updateLoginEmail(value)
        } else if (event.target.id === "password-input") {
            this.props.updateLoginPassword(value)
        }
    }; // end handleChange()
  
    // When the "Login" button is clicked
    handleLogin = event => {
        event.preventDefault(); // Prevents form from automatically submitting
    
        signIn(this.props.email, this.props.password) // Calls sign in pulled from Firebase functions
    };

    // When the "Logout" button is clicked
    handleLogout = event => {
      signOut();
    } 

    // When the login request returns an error
    handleError = () => {
        var errorCode = this.props.error
        var errorMsg = "";

        if (!errorCode) {
            return "";
        }

        // Handle errors returned by Firebase Auth API
        switch(errorCode) {
            case "auth/invalid-email":
                errorMsg = "This email was not found";
                break;
            
            case "auth/user-disabled":
                errorMsg = "This user has been disabled";
                break;

            case "auth/user-not-found":
                errorMsg = "This user was not found";
                break;

            case "auth/wrong-password":
                errorMsg = "The password was incorrect, please try again";
                break;

            case "auth/too-many-requests":
                errorMsg = "There have been too many requests, please wait a moment";
                break;

            default:
                errorMsg = "There was an error, please try again";
        }

        return (
            <div className="uk-alert-danger" uk-alert>
                <p id="login-error">{errorMsg}</p>
            </div>
        )
    }
    
    render() {
    
        return (
        <div className="login-form">
            <h3>Log In</h3>
                <form onSubmit={this.handleLogin}>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input 
                                placeholder="Email" 
                                className="uk-input" 
                                type="email" 
                                id="email-input"
                                val={this.state.email}
                                required="true"
                                onChange={this.handleChange}
                                autofill="false"
                            />
                        </div>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                placeholder="Password" 
                                className="uk-input" 
                                type="password" 
                                id="password-input"
                                required="true"
                                val={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <this.handleError></this.handleError>

                    <button className="uk-button uk-button-default uk-width-1-1">Log In</button>
                </form>

                <br/>

                <a onClick={this.props.toggleLoginPage}>Forgot Password?</a>
            </div>
    )
    }
}

// Take the state from redux and plonk it into the props of my login component
function mapStateToProps(state) {
    const { login } = state
  
    return { email: login.email, password: login.password, error: login.error }
}
  
const mapDispatchToProps = {
    updateLoginEmail, // These values are imported from login.actions
    updateLoginPassword,
    toggleLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);