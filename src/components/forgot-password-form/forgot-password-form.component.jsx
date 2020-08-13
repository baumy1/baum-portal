import React from 'react';
import { connect } from 'react-redux';

import { toggleLoginPage, updateLoginEmail } from '../../redux/login/login.actions';

// Import firebase functionality
import { resetPassword } from "../../firebase/firebase";

import "./forgot-password-form.styles.scss";

class ForgotPasswordForm extends React.Component {
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
        }
    }; // end handleChange()

    handleReset = event => {
        event.preventDefault(); // Prevents form from automatically submitting
        console.log("Reset")
        resetPassword(this.props.email) // Calls reset method pulled from Firebase functions
    };

    // When the login request returns an error
    handleError = () => {
        var errorCode = this.props.error
        var errorMsg = "";

        if (!errorCode) {
            return "";
        }

        if (errorCode == "OK") {
            return (
                <div>
                    <div class="uk-alert-success" uk-alert="true">
                        <p>A password reset request has been sent, check the provided email</p>
                    </div>
                </div>
            )
        }

        // Handle errors returned by Firebase Auth API
        switch(errorCode) {
            case "auth/invalid-email":
                errorMsg = "The email is invalid, please try again";
                break;
            
            case "auth/user-auth/user-not-found":
                errorMsg = "This account was not found, please try again";
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
            <div class="uk-alert-danger" uk-alert>
                <p id="login-error">{errorMsg}</p>
            </div>
        )
    }

    render() {
        return(
            <div className="forgot-password-form">
                <h3>Forgot Password</h3>
                <form onSubmit={this.handleReset}>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input 
                                placeholder="Email" 
                                className="uk-input" 
                                type="email" 
                                id="email-input"
                                required="true"
                                val={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        </div>
                            
                        <this.handleError></this.handleError>

                        <button className="uk-button uk-button-default uk-width-1-1">Reset Password</button>                
                    <br/><br/>
                    <a onClick={this.props.toggleLoginPage}>Return to Log In</a>

                    
             
                </form>
            </div>
        )
    }
}

// Take the state from redux and plonk it into the props of my login component
function mapStateToProps(state) {
    const { login } = state
  
    return { email: login.email, error: login.error }
}

const mapDispatchToProps = {
    updateLoginEmail, // These values are imported from login.actions
    toggleLoginPage
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);