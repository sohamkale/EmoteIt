import React,{useState, useEffect} from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat";

const config = {
    apiKey: "AIzaSyAotI_pxRFngCqeJMXeo9K-kpwpKLi4Vrc",
    authDomain: "emoteit-96e60.firebaseapp.com",
    projectId: "emoteit-96e60",
    storageBucket: "emoteit-96e60.appspot.com",
    messagingSenderId: "585032225881",
    appId: "1:585032225881:web:d6b570e81abf3cdf5f4d48",
    measurementId: "G-7358BR2HZD"
};

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


export default function GoogleLogin(){
    const [user,setUser] = useState();

    useEffect(()=>{
        // console.log(user)
    },[user])

    function SignIn(){
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                const user = result.user;
                setUser(user);
                console.log(user.accessToken)
                console.log(user.uid)

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

    function SignOut(){
        auth.signOut().then((res)=>{
            setUser({});
        });
    }
    return (
        <>
        <button onClick={SignIn}>Google Sign in</button>
        <button onClick={SignOut}>Google Sign Out</button>
            </>
    )
}

