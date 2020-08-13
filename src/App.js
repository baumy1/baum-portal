// React imports 
import React from 'react';

// Redux imports
import { connect } from 'react-redux';

// Page imports
import LoginPage from "./pages/login/login.page"
import NewUserDataPage from "./pages/new-user-data/new-user-data.page";

// Firebase imports
import {signIn, signOut, getUserData} from "./firebase/firebase";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  displayLogin = (props) => {
    console.log(this.props.user)
    if(!this.props.user.uid) {

      return <LoginPage></LoginPage>

    } else if(!this.props.user.phone) {

      return <div><NewUserDataPage></NewUserDataPage></div>

    } else {
    return <div>
      <br></br>
              <h1>Welcome back { this.props.user.firstName }</h1>
              <br></br>
              <h2>First Name: {this.props.user.firstName}</h2>
              <h2>Last Name: {this.props.user.lastName}</h2>
              <h2>Country: {this.props.user.country}</h2>
              <h2>Contact Email: {this.props.user.contactEmail}</h2>
              <h2>Phone Number: {this.props.user.phone}</h2>
        
              <br>
              </br>
              <button onClick={signOut}>Log out</button>
            </div>
    }
  }

  render(){
    return (
      <div className="App">
        <this.displayLogin></this.displayLogin>
      </div>
    );
  }
}

// Take the state from redux and plonk it into the props of my login component
function mapStateToProps(state) {
  const { user } = state

  return { user: user }
}

export default connect(mapStateToProps, null )(App);
