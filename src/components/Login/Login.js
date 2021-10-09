import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import navLogo from '../../images/logos/logo.png';

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
        <div className='text-center pt-5 text-light' style={{minHeight: '100vh', backgroundColor: 'whitesmoke'}}>
            <div>
                <div className='text-center text-light py-4'>
                    <img src={navLogo} alt="" style={{width: '150px'}} />
                </div>
                <div>
                    {
                        loggedInUser.email ? 
                            <div className='text-center'>
                                <button onClick={() => setLoggedInUser({})} className='btn btn-danger my-2 w-50'>Sign-Out</button><br />
                            </div>
                        : 
                        <div className='rounded py-5 my-0 mx-auto w-50 shadow'>
                            <h2 style={{color: '#000'}}>Login With</h2>
                            <button onClick={handleSignIn} className='btn btn-danger my-2'>Google SignIn</button><br />
                            <button className='btn btn-success my-1 px-4'><Link className='text-light text-decoration-none' to='/'>Home</Link></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;