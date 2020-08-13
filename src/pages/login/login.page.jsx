import React from 'react';

// Page components
import LoginFooter from "../../components/login-footer/login-footer.component";
import LoginContainer from "../../components/login-container/login-container.component";

// Stylesheet
import "./login.styles.scss";

class LoginPage extends React.Component {
    render(){
        return(
            <div className="login">
                <LoginContainer className="login-container"></LoginContainer>
                <LoginFooter className="login-footer"></LoginFooter>
            </div>
        ) // End return
    } // End render()
} // End Class

export default LoginPage;