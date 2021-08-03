import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        //google login setup
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                var newUser = {name: user.displayName, email: user.email}
                setLoggedInUser(newUser);
                // authToken()
                // sessionStorage.setItem('email', loggedInUser.email)
                history.replace(from)
                // ...
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage)
            });
    }
    const authToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken)
        }).catch(function (error) {
            // Handle error
        });
    }
    return (
        <div>
            <h2>Login And Secure Browse</h2>
            <button onClick={handleSignIn}>Google SignIn</button><br />
            <button><a href='/'>Home</a></button>
        </div>
    );
};

export default Login;