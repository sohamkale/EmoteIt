import React, {useContext, useState} from 'react'
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";
import axios from "axios";
import {Link} from "react-router-dom";

export const Login = () => {
    const {user, accessToken, SignIn, SignOut} = useContext(AuthenticationContext);
    //for new users
    const [name, setName] = useState();
    const [dob, setDob] = useState();
    const [msg, setMsg] = useState("");

    function CreateUser() {
        axios.post('/api/user/authenticate', {
            name: name, DOB: dob
        }, {headers: {"access-token": accessToken}})
            .then((res) => {
                window.location.reload();
            }).catch((err)=>{
                setMsg(err.response.data.message);
        })
    }

    return (
        <div className="bg_fullpage login_page">
            <div className="container_fullpage d-flex">
                <div className="col-12 col-md-4 col-lg-3 m-auto bg-dark-75 p-3 rounded text-center text-white">
                    <h2>Welcome!</h2>
                    <div className="text-white">EmoteIt Authentication is powered by Google Single Signon.
                        Please use your google account to sign in below.
                    </div>
                    {/*User: {user?.name}*/}

                    {/*    Login Button/ Form */}
                    {
                        user != null && user._id ?
                            <>
                                <div className="text-white">You are logged in as {user.name}</div>
                                <div className="row m-2">
                                    <div className="col">
                                        <Link to={"/app/home"}>
                                            <div className="btn btn-extra_dark m-auto">
                                                <i className="fa-solid fa-house mr-2"></i>
                                                Home
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col">
                                        <div className="btn btn-extra_dark m-auto" onClick={SignOut}>
                                            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                                            Signout
                                        </div>
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
                                        <input className="form-control" placeholder="Display Name" value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                        <label className="text-light">Display Name</label>
                                        <input type="date" className="form-control"
                                               placeholder="Date of Birth" value={dob}
                                               onChange={(e) => setDob(e.target.value)}/>
                                        <label className="text-light">Date of Birth</label>
                                    </div>

                                    <div className="row m-2">
                                        <div className="btn btn-extra_dark m-auto"  onClick={CreateUser}>
                                            Create Profile
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="row m-2">
                                    <div className="btn btn-extra_dark m-auto" onClick={SignIn}>
                                        <i className="fa-brands fa-google-plus-g mr-2"></i>
                                        Login
                                    </div>
                                </div>
                    }
                    <div className="row text-warning">
                        <div className="m-auto">{msg}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}