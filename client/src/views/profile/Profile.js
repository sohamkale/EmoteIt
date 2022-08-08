import React, {useContext, useEffect, useState} from 'react'
import UserCard from "../shared/components/UserCard";
import EmortionView from "../emortion/components/EmortionView";
import './profile.scss'
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import axios from "axios";
import {useParams} from "react-router-dom";
import {SingleInsight} from "../emortion/components/insight/RevealedInsights";
import Moment from "react-moment";

export default function Profile(props) {
    const [emortions, setEmortions] = useState();
    const [mostInsightedEmortion, setMostInsightedEmortion] = useState();
    const [insights, setInsights] = useState([]);
    const {user, accessToken, setLoading} = useContext(AuthenticationContext);
    const [relationships, setRelationships] = useState();
    const [profile, setProfile] = useState();


    const [msg, setMsg] = useState("");

    let {id: profileId} = useParams();


    function GetRelationships() {
        axios.get(`/api/friendship/request`, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            setRelationships(res.data);
        });

    }

    function GetEmortions() {
        axios.get(`/api/profile/emortions/${profileId}?limit=10`, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setEmortions(res.data);
            setMsg("success!");
            console.log(res.data)
        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);

        })
    }

    function GetInsights() {
        axios.get(`/api/profile/insights/${profileId}?limit=5`, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setInsights(res.data);
        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);

        });
    }

    function GetMostInsisghtedEmortion() {
        axios.get(`/api/profile/emortion/${profileId}`, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setMostInsightedEmortion(res.data);
            setMsg("success!");
            console.log(res.data)
        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
        })
    }


    useEffect(() => {

        if (user != null) {
            //    get user's emortion
            if (profileId == null)
                profileId = user?._id;
            GetRelationships();
            GetEmortions();
            GetMostInsisghtedEmortion();


            axios.get(`/api/profile/byId/${profileId}`, {
                headers: {
                    "access-token": accessToken
                }
            }).then((res) => {
                setProfile(res.data);
            });


            GetInsights();

            /* axios.patch(`/api/emortion/user/${profileId}`,null,{headers:{
                 'access-token': accessToken
                 }}).then((res)=>{
                     setMostInsightedEmortion(res.data);
             });*/
        }

    }, [user, profileId])


    return (

        <>
            {
                (profile === undefined || profile === null) ? <center>
                        <div className="text-center spinner-border"/>
                    </center> :
                    <div className="row mb-3">
                        <div className="col-12 col-md-4">
                            <UserCard user={profile?.user} profile={profile} relationship={relationships?.find(x=>x.requesterUserId?._id == user?._id || x.requesteeUserId?._id == user?._id)}/>
                            <hr/>
                            <div className="card m-2">
                                <div className="card-title border-bottom m-2">
                                    <h4 className="">Info</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-5 text-bold">Bio</div>
                                        <div className="col-7 text-muted">{profile?.user?.bio}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-5 text-bold">Birthday</div>
                                        <div
                                            className="col-7 text-muted">{new Date(profile?.user?.DOB)?.toLocaleDateString()}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-5 text-bold">Email</div>
                                        <div className="col-7 text-muted">{profile?.user?.email}</div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card m-2 profile-info-row-card">
                                <div className="card-title border-bottom m-2">
                                    <h4 className="">Statistics</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 text-bold">Emortion Likes</div>
                                        <div className="col-6 text-muted">{profile?.emortionLikes}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Insight Likes</div>
                                        <div className="col-6 text-muted">{profile?.insightLikes}</div>
                                    </div>

                                    {/*<div className="row">
                                <div className="col-6 text-bold">Level</div>
                                <div className="col-6 text-muted">{profile?.userLevel?.level}</div>
                            </div>*/}

                                    <div className="row">
                                        <div className="col-6 text-bold">EmoteIt Rank</div>
                                        <div className="col-6 text-muted">{profile?.globalRank}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Emortions</div>
                                        <div className="col-6 text-muted">{profile?.emortionCount}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Insights</div>
                                        <div className="col-6 text-muted">{profile?.insightCount}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Accuracy</div>
                                        <div
                                            className="col-6 text-muted">{((profile?.avgAccuracy ?? 0) * 100).toFixed(2)}%
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Relationships</div>
                                        <div className="col-6 text-muted">{profile?.relationshipCount}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Avg Insight Time</div>
                                        <div
                                            className="col-6 text-muted">{profile?.avgAnswerTime < 60 ? "n/a":profile.avgAnswerTime?.toFixed()/1000} sec
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 text-bold">Latest Active</div>
                                        <div className="col-6 text-muted">
                                            <Moment className="" date={profile?.latestActive}
                                                    durationFromNow={true} format={"Y [years] D[d] H[h] m[m] ago"}
                                                    trim={"both"}/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card bg-dark profile-info-row-card m-2 mostInsightedEmortion">
                                <div className="card-title text-white pl-2">Most Insighted Emortion
                                    <i className="fas fa-trophy text-white m-1"></i>
                                </div>
                                <div className="card-body p-1 mostInsightedEmortion-body">
                                    <EmortionView emortion={mostInsightedEmortion}
                                                  GetEmortion={GetMostInsisghtedEmortion}/>
                                </div>
                            </div>

                        </div>

                    </div>
            }

            <div className="row">
                <div className={"m-auto text-warning"}>{msg}</div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3 border-right">
                    <h2>Friends</h2>
                    <div className="bg-light mb-2 p-3">
                        <div className="row overflow-auto" style={{maxHeight: "1000px"}}>
                            {(relationships === undefined || relationships === null) ? <center>
                                    <div className="text-center spinner-border"/>
                                </center> :
                                relationships?.filter(x => x.statusId == 1)?.map((item, index) =>

                                    <UserCard key={index}
                                              user={user?._id === item?.requesteeUserId?._id ? item?.requesterUserId : item?.requesteeUserId}
                                              getList={props.getList} relationship={item}/>
                                )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <h2>Emortions</h2>
                    {
                        (emortions === undefined || emortions === null) ? <center>
                                <div className="text-center spinner-border"/>
                            </center> :
                            emortions.map((item, index) =>
                                <EmortionView key={index} emortion={item} GetEmortion={GetEmortions}/>
                            )
                    }
                </div>

                <div className="col-12 col-md-4">
                    <h2>Insights</h2>
                    <div className="row">
                        {
                            (insights === undefined || insights === null) ? <center>
                                    <div className="text-center spinner-border"/>
                                </center> :
                            insights?.map((item, index) =>
                                <SingleInsight key={index} insight={item} GetInsights={GetInsights}/>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    );
}