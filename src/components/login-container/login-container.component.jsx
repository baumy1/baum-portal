import React from 'react';
import { connect } from 'react-redux';

import "./login-container.styles.scss";

import LoginForm from "../login-form/login-form.component";
import ForgotPasswordForm from "../forgot-password-form/forgot-password-form.component";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }    

    render() {

        // Function to read props and return the appropriate prop
        // If the state is forgot then show the forgot password form and if the state is login then show the login form
        this.displayFormLogic = (props) => {
            if(props.display === "forgot") {
                return <ForgotPasswordForm/>
            } else {
                return <LoginForm/>
            } 
        }

        this.handleErrorClass = () => {
            if(this.props.error === "") {
                return true;
            } else {
                return false;
            }
        }

        return(
            <div className={`login-container ${ this.handleErrorClass() ? "" : "error-msg" }`}>
                {this.displayFormLogic(this.props)}
            </div>
        )
    } // End render
} // End class

// Take the state from redux and plonk it into the props of my app component
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        display: state.login.display,
        error: state.login.error
    }
  }

export default connect(mapStateToProps, null)(LoginContainer);