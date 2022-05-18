/*
import React, {useState, useEffect} from 'react'
import $ from "jquery"
import ForgotPassword from "./ForgotPassword";
import {FirebaseAuth, StyledFirebaseAuth} from "react-firebaseui";
import firebase from 'firebase/compat/app';
import {initializeApp} from "firebase/app";

import 'firebase/compat/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const analytics = getAnalytics(app);

export default function Login(props){
    const[modalActive, setModalActive] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);


    if (!isSignedIn) {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );

        return (
            <div>
                <h1>My App</h1>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            </div>
        );
    }

    /!*return (
        <div className="right">

            <div className="content">
                <h2>Login</h2>

                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

                {/!*                            <form id="form-login" method="post" onSubmit="return false;">*!/}
            {/!*    <div className="form-element form-stack">
                    <label htmlFor="username-login" className="form-label">Username or Email</label>
                    <input id="username-login" type="text" name="username"/>
                </div>
                <div className="form-element form-stack">
                    <label htmlFor="password-login" className="form-label">Password</label>
                    <input id="password-login" type="password" name="password"/>
                </div>*!/}
                {/!*<div className="form-element form-submit">*!/}
                {/!*    <button id="logIn" className="login" name="login">Log In</button>*!/}
                {/!*    <button id="goRight" className="login off" name="signup">Sign Up</button>*!/}
                {/!*    <a onClick={()=>{*!/}
                {/!*        setModalActive(true)*!/}
                {/!*    }} type="button" data-toggle="modal" data-target="#exampleModal">Forgot Password?</a>*!/}
                {/!*</div>*!/}
                <ForgotPassword setModalActive={setModalActive} modalActive={modalActive}/>

            </div>


        </div>

    )*!/
}

*/
