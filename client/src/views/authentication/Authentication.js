import React, {useEffect, useContext} from 'react'
import './Authentication.scss'
import {config} from "./components/config.firebase";
import firebase from "firebase/compat";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";


export default function Authentication(props) {
    const {user, SignIn, SignOut} = useContext(AuthenticationContext);


    return (
        <>
            <div id="back"></div>

            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-10 col-10 m-auto mt-5 login-form-col">
                    <div className="login-form m-auto">
                        <div>
                            <div className="text-white gj-text-align-center">
                                <h1>Welcome!</h1>
                            </div>
                            <div className="form-sec gj-text-align-center">
                                <div>
                                    <form className="theme-form">
                                        {
                                            user !=null && user._id?
                                                <>
                                                    <div className="text-white">You are logged in as {user.name}</div>
                                                    <div className="btn-section">
                                                        <div className="btn btn-solid btn-lg" onClick={SignOut}>Signout</div>
                                                    </div>
                                                </>
                                                :
                                                <div className="btn-section">
                                                    <div className="btn btn-solid btn-lg" onClick={SignIn}>Login</div>
                                                </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  <GoogleLogin/>*/}
        </>
    );
}