import React, {useContext, useEffect, useState} from 'react'
import UserCard from "../shared/components/UserCard";
import EmortionView from "../emortion/components/EmortionView";
import './profile.scss'
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import Insight from "../emortion/components/insight/Insight";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Profile(props) {
    const [emortions, setEmortions] = useState([]);
    const {user, accessToken} = useContext(AuthenticationContext);
    const [relationships,setRelationships] = useState();

    let {id:profileId} = useParams();


    function GetRelationships() {
        axios.get(`/api/friendship/request`, {
            headers: {"access-token": accessToken}
        }).then((res) => {
            setRelationships(res.data);
        });

    }

    useEffect(()=>{
        GetRelationships();

    //    get user's emortion
        if(profileId == null)
            profileId = user?._id;
        axios.get(`/user/emortion/${profileId}`,{headers:{
            "access-token":accessToken
            }}).then((res)=>{
            setEmortions(res.data);
        })
    },[])

    return (
        <div className="container">
            <div className="row mb-3 profile-info-row">
                <div className="col-12 col-md-4">
                    <UserCard user={user}/>

                    <div className="card m-2">
                        <div className="card-title border-bottom m-2">
                            <h4 className="">Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 text-bold">Bio</div>
                                <div className="col-7 text-muted">{user?.bio}</div>
                            </div>

                            <div className="row">
                                <div className="col-5 text-bold">Birthday</div>
                                <div className="col-7 text-muted">{new Date(user?.DOB)?.toLocaleDateString()}</div>
                            </div>

                            <div className="row">
                                <div className="col-5 text-bold">Email</div>
                                <div className="col-7 text-muted">{user?.email}</div>
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
                                <div className="col-6 text-muted">20032</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Insight Likes</div>
                                <div className="col-6 text-muted">20032</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Level</div>
                                <div className="col-6 text-muted">3</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">EmoteIt Rank</div>
                                <div className="col-6 text-muted">362</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Emortions</div>
                                <div className="col-6 text-muted">20</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Insights</div>
                                <div className="col-6 text-muted">15</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Accuracy</div>
                                <div className="col-6 text-muted">20%</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Relationships</div>
                                <div className="col-6 text-muted">53</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Avg Insight Time</div>
                                <div className="col-6 text-muted">36 sec</div>
                            </div>

                            <div className="row">
                                <div className="col-6 text-bold">Latest Active</div>
                                <div className="col-6 text-muted">10/1/2022</div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="col-12 col-md-4">
                    <div className="card bg-dark profile-info-row-card m-2 mostInsightedEmortion">
                        <div className="card-title text-white pl-2">Most Insighted Emortion
                            <i className="fas fa-trophy text-white m-1"></i>
                        </div>
                        <div className="card-body p-1">
                            <EmortionView/>
                        </div>
                    </div>

                </div>

            </div>
            <div className="row">
                <div className="col-12 col-md-3">
                    <h2>Friends</h2>
                    <div className="bg-light mb-2 p-3">
                        <div className="row overflow-auto" style={{maxHeight:"400px"}}>
                            {relationships?.filter(x=>x.statusId == 1)?.map((item,index)=>

                                    <UserCard key={index} user={user?._id === item?.requesteeUserId?._id ? item?.requesterUserId : item?.requesteeUserId}
                                              getList={props.getList} relationship={item}/>

                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <h2>Emortions</h2>
                    {
                        emortions.map((item,index)=>
                        <EmortionView key={index} emortion={item}/>
                        )
                    }
                </div>

                <div className="col-12 col-md-3">
                    <h2>Insights</h2>
                    <Insight/>
                    <Insight/>
                </div>
            </div>
            {/*

              <div className="col-xl-5 col-sm-12 post-panel">

                  <div className="card bg-dark">
                      <div className="card-title text-white">Most Insighted Emortion &nbsp; <i className="fas fa-trophy text-white"></i></div>
                      <div className="mostInsightedEmortion">
                          <EmortionView/>
                      </div>
                  </div>
              </div>
                </div>
          <div className="container-fluid section-t-space px-0 layout-default post-panel">
                    <div className="row">

                        <div className="col-xl-3 col-sm-12 d-xl-block mt-2">
                            <div className="card bg-light sticky-cols">
                                <div className="card-title p-3">
                                    <h3>Friends</h3>
                                </div>
                                <div className="profilePageRestrictedHeight">
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-12 mt-2">
                            <div className="card bg-light">
                                <div className="card-title p-3">
                                    <h3>Emortions</h3>
                                </div>
                                <div className="profilePageRestrictedHeight">
                                    <EmortionView/>
                                    <EmortionView/>
                                    <EmortionView/>
                                </div>
                            </div>



                        </div>
                        <div className="col-xl-3 col-sm-12 mt-2">
                            <div className="card bg-light sticky-cols">
                                <div className="card-title p-3">
                                    <h3>Insights</h3>
                                </div>
                                <div className="card-body ">
                                    <div className="profilePageRestrictedHeight">
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>*/}
        </div>
    );
}