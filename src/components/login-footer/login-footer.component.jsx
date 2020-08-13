import React from 'react';

import Logo from '../logo/logo.component';
import './login-footer.styles.scss';

const LoginFooter = () => {
    return(
        <div className="login-footer">
            <Logo className="logo"></Logo>
            <p className="copyright">&copy; Baum Cycles 2020</p>
        </div>
    )
}

export default LoginFooter;