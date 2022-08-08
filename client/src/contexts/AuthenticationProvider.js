import React, {createContext, useEffect, useState} from 'react'
import {useCookies} from "react-cookie";
import axios from "axios";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import firebase from "firebase/compat";
import {config} from "../config";
import {Login} from "../views/authentication/Login";
import {useLocation} from "react-router-dom";

export const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {


    firebase.initializeApp(config);

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    const auth = getAuth();
    auth.languageCode = 'en';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });


    const [googleUser, setGoogleUser] = useState();
    const [user, setUser] = useState(); // emote it user!
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'tokenExpires']);
    const [loading, setLoading] = useState(false);


    function SignIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                const user = result.user;
                setGoogleUser(user);

                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    function SignOut() {
        setGoogleUser(null);
        setUser(null);
        removeCookie("token")
        removeCookie("tokenExpires")
        console.log("you are now logged out!");
        window.location.href = "/";
    }

    function GetEmoteitUser(token) {
        setLoading(true);
        axios.get('/api/user/authenticate', {
            headers: {"access-token": token}
        }).then((res) => {
            if (res.data) {
                setUser(res.data);
                setLoading(false);
            } else if (res.status == 204) {
                console.log("new user... calling create")
                setUser(1);
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);

        })
    }

    useEffect(() => {
        const token = cookies.token;
        if (token != null) {
            console.log("token exists! checking if it expired..")
            const tokenExpires = cookies.tokenExpires;
            const currentTime = new Date();
            if (currentTime >= tokenExpires) {
                console.log("token expired!");
                SignOut();
            } else {
                console.log("user token exists and valid! fetching user from backend...");
                GetEmoteitUser(token);
            }
        } else if (token == null) {
            {
                console.log("no token in cookie! fetching user from backend...");
                // GetEmoteitUser(token);
            }
        }
    }, [])

    useEffect(() => {
        if (googleUser != null && googleUser.accessToken != null) {
            setCookie('token', googleUser.accessToken);
            const timeNow = new Date();
            setCookie('tokenExpires', timeNow.setHours(timeNow.getHours() + 1));
            GetEmoteitUser(googleUser.accessToken);
        }
    }, [googleUser])


    useEffect(() => {
        if (user != null && googleUser != null) {
            console.log(googleUser)
        }
    }, [user])

    const returnee = {
        user, accessToken: cookies.token, SignIn, SignOut, setLoading
    }

    const location = useLocation();

    return (
        <AuthenticationContext.Provider value={returnee}>
            {
                loading ?
                    <div className="loader-page">
                        <div className="loader mt-5"></div> :

                    </div>
                    :
                    <></>
            }
            {
                    user == null && location.pathname!="/app/info" ?
                        <Login/>
                        :
                        props.children

            }
        </AuthenticationContext.Provider>
    )
}