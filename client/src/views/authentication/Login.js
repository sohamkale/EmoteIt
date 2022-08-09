import React, {useContext, useEffect, useState} from 'react'
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import axios from "axios";
import {Link} from "react-router-dom";
import TopLeaderBoardCard from "../leaderboard/component/TopLeaderBoardCard";

export const Login = () => {
    const {user, accessToken, SignIn, SignOut} = useContext(AuthenticationContext);
    //for new users
    const [name, setName] = useState();
    const [dob, setDob] = useState();
    const [bio, setbio] = useState();
    const [msg, setMsg] = useState("");


    //stats
    const [topTen, setTopTen] = useState();
    const [stats, setStats] = useState(new Date());


    useEffect(() => {
        axios.get(`/api/leaderboard/top10`).then((res) => {
            setTopTen(res.data);
        })

        axios.get(`/api/leaderboard/stats`).then((res) => {
            setStats(res.data)
        })

    }, [])

    function CreateUser() {
        axios.post('/api/user/authenticate', {
            name, DOB: dob, bio
        }, {headers: {"access-token": accessToken}})
            .then((res) => {
                window.location.reload();
            }).catch((err) => {
            setMsg(err.response.data.message);
        })
    }

    return (
        <div className="bg_fullpage login_page">
            <div className="container_fullpage">
                <div className="row pt-5 w-75 m-auto">
                    <div className="col-12 col-md-6 m-auto bg-dark-75 p-3 rounded text-center text-white">
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

                                        <div className="col">
                                            <Link to={"/app/info"}>
                                                <div className="btn btn-extra_dark m-auto text-white">
                                                    <i className="fa-solid fa-list mr-2"></i>
                                                    About
                                                </div>
                                            </Link>
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
                                            <textarea className="form-control" placeholder="Bio" value={bio}
                                                      onChange={(e) => setbio(e.target.value)}/>
                                            <label className="text-light">Something about yourself</label>
                                        </div>

                                        <div className="row m-2">
                                            <div className="btn btn-extra_dark m-auto" onClick={CreateUser}>
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

                                        <div className="btn btn-extra_dark m-auto text-white">
                                            <Link to={"/app/info"}>
                                                <i className="fa-solid fa-list mr-2"></i>
                                                About
                                            </Link>
                                        </div>


                                    </div>
                        }
                        <div className="row text-warning">
                            <div className="m-auto">{msg}</div>
                        </div>
                    </div>

                </div>
                <hr/>
                <div className="row bg-dark text-light rounded p-3 w-75 m-auto">
                    <div className={"col border-right border-bottom"}>
                        <h5>Emortions</h5>
                        <h5 className="text-bold">{stats?.emortionCount}</h5>
                    </div>
                    <div className={"col border-right border-bottom"}>
                        <h5>Insights</h5>
                        <h5 className="text-bold">{stats?.insightCount}</h5>
                    </div>
                    <div className={"col border-right border-bottom"}>
                        <h5>Emorters</h5>
                        <h5 className="text-bold">{stats?.newUserCount}</h5>
                    </div>

                    <div className={"col border-right border-bottom"}>
                        <h5>Relationships</h5>
                        <h5 className="text-bold">{stats?.newRelationshipCount}</h5>
                    </div>


                </div>

                <hr/>
                <div className="row w-75 m-auto">

                    {topTen?.slice(0, 3)?.map((item, index) =>
                        <div key={index} className="col-12 col-md-4 mb-2">
                            <TopLeaderBoardCard color={
                                index == 0 ? "goldenrod" : index == 1 ? "darkgrey" : index == 2 ? "brown" : "black"
                            } profileId={item._id}
                            />
                        </div>
                    )}

                </div>


            </div>
        </div>
    );
}