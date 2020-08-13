// Firebase Configuration information
import firebaseConfig from "./config.firebase";

// Redux imports
import store from "../redux/store";
import userTypes from "../redux/user/user.types";
import loginTypes from "../redux/login/login.types";

/*
*   Init Firebase
*/

// Imports from Firebase NPM package
var firebase = require("firebase/app");
require("firebase/auth"); // Auth module
require("firebase/firestore"); // Database module

// Initialize Firebase using configuration
firebase.initializeApp(firebaseConfig);

// DB reference
var db = firebase.firestore();

/*
*  Auth functionality
*/

// When the firebase auth state changes, dispatch that information to the user reducer in the redux store
// Or for now just like console.log it :)
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("A wild user appeared! Hello! (logged in)")
      console.log(user)

      getUserData(user)

      // Dispatch the new login information to the redux store
      store.dispatch({type: userTypes.LOG_IN_USER, payload: user});
      store.dispatch({type: loginTypes.UPDATE_ERROR, payload: ""});
    } else {
      // No user is signed in.
      console.log("See ya later user! (logged out)");

      // Dispatch the new login information to the redux store
      store.dispatch({type: userTypes.LOG_OUT_USER});
    }
});

// Sign in request to firebase
function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        if (errorCode || errorMessage) {
          console.log("Error: " + errorMessage)
          
          console.log("Firebase error: " + errorCode)
          store.dispatch({type: loginTypes.UPDATE_ERROR, payload: errorCode})
        }
      });
}

// Send password reset email
function resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // After the reset has been achieved
      console.log("DISPATCHING OK")
      store.dispatch({type: loginTypes.UPDATE_ERROR, payload: "OK"});
  
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("Error code: " + errorCode)

      if (errorCode || errorMessage) {
        console.log("Error: " + errorMessage)
        
        console.log("Firebase error: " + errorCode)
        store.dispatch({type: loginTypes.UPDATE_ERROR, payload: errorCode})
      } 
    })
}

function signOut() {
    firebase.auth().signOut();
}

/*     
*      A note on user information:
*      User data is accessed via the redux store, the store is updated whenever the auth state changes
*      Redux will update all instances that use this store data accordingly and therefore Firebase doesn't need to
*
*       - Will B
*/

/*
*     Database functions
*/
function getUserData(user) {
  
  var userRef = db.collection(user.uid).doc("personal");

  userRef.get().then(function(doc) {
    if (doc.exists) {
      store.dispatch({type: "USER_DATA_FROM_DB", payload: doc.data()})
      return
    } else {
        // doc.data() will be undefined in this case
        return;
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}

function submitNewUserData(user) {
  var newUserData = store.getState().newUserData;

  db.collection(user.uid).doc("personal").set(newUserData).then(function() {
    console.log("Document successfully written!");
    store.dispatch({type: "USER_DATA_FROM_DB", payload: newUserData})
    return "OK";
  }).catch(function(error) {
    console.error("Error writing document: ", error);
    return "ERROR";
  });
    
}

// Export these functions
export {signOut, signIn, resetPassword, getUserData, submitNewUserData};
