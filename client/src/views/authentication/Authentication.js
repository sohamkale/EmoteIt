import React, {useEffect, useContext, useState} from 'react'
import './Authentication.scss'
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";
import axios from "axios";
import {Link} from "react-router-dom";


export default function Authentication(props) {
    const {user, accessToken, SignIn, SignOut} = useContext(AuthenticationContext);

    //for new users
    const [name, setName] = useState();
    const [dob, setDob] = useState();

    function CreateUser(){
        axios.post('/api/user/authenticate',{
            name: name, DOB: dob
        },{ headers:{"access-token": accessToken} })
            .then((res)=>{
                window.location.reload();
            })
    }


    return (
        <>
            <div id="back"></div>

            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-10 col-10 m-auto mt-5 login-form-col">
                    <div className="login-form m-auto">
                        <div>
                            <div className="text-white gj-text-align-center">
                                <h1>Welcome!</h1>
                                <div className="text-white">EmoteIt Authentication is powered by Google Single Signon.
                                    Please use your google account to sign in below.</div>
                            </div>
                            <div className="form-sec gj-text-align-center">
                                <div>
                                    <form className="theme-form">
                                        {
                                            user != null && user._id ?
                                                <>
                                                    <div className="text-white">You are logged in as {user.name}</div>
                                                    <div className="btn-section">
                                                        <Link to={"/app/home"}>
                                                            <div className="btn btn-solid btn-lg mb-2">
                                                                <i className="fa-solid fa-house mr-2"></i>
                                                                Home
                                                            </div>
                                                        </Link>

                                                        <div className="btn btn-solid btn-lg mb-2"
                                                             onClick={SignOut}>
                                                            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                                                            Signout
                                                        </div>

                                                    </div>
                                                </>
                                                :
                                                user != null && user == 1 ?
                                                    <>
                                                        <div className="text-white">Thanks for trying out EmoteIt!
                                                            Please provide information below to create your profile!
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <input className="form-control" placeholder="Display Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                                            <label className="text-light">Display Name</label>
                                                            <input type="date" className="form-control"
                                                                   placeholder="Date of Birth" value={dob} onChange={(e)=>setDob(e.target.value)}/>
                                                            <label className="text-light">Date of Birth</label>
                                                            <input type={"button"} className="btn btn-dark" value="Create Profile" onClick={CreateUser}/>
                                                        </div>
                                                    </>
                                                    :
                                                    <div className="btn-section">
                                                        <div className="btn btn-solid btn-md" onClick={SignIn}>
                                                            <i className="fa-brands fa-google-plus-g mr-2"></i>
                                                            Login
                                                        </div>
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