import React from 'react'
import Stats from "../../components/profile/Stats";
import UserCard from "../../components/shared/UserCard";
import EmortionView from "../../components/emortion/EmortionView";
import {RevealedInsight} from "../../components/emortion/RevelaedInsights";
import {emortions} from "../../components/emortion/InsightFunctions";
import './profile.scss'

export default function Profile(props){
    return (
        <>
          <div className="row">

                    <div className="col-xl-4 col-sm-12" style={{height:"100% !important"}}>
                        <UserCard/>
                        <div className="about-profile section-b-space">
                            <div className="card-title">
                                <h3>Info</h3>
                            </div>
                            <ul className="about-list">
                                <li>
                                    <h5 className="title">Bio</h5>
                                    <h6 className="content">In my spare time, I enjoy going to the gym and regularly
                                        partake
                                        in charity runs around the UK in order to help the community and to stay fit
                                        and
                                        healthy.
                                    </h6>
                                </li>
                                <li>
                                    <h5 className="title">Birthday</h5>
                                    <h6 className="content">8th July</h6>
                                </li>
                                <li>
                                    <h5 className="title">Email</h5>
                                    <h6 className="content">larkijhul@gmail.com</h6>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-12">

                  <Stats/>
              </div>

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
                                {/*<div className="profilePageRestrictedHeight">*/}
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>
                                    <div className="col-12">
                                        <UserCard/>
                                    </div>


                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-12 mt-2">
                            <div className="card bg-light">
                                <div className="card-title p-3">
                                    <h3>Emortions</h3>
                                </div>
                                {/*<div className="profilePageRestrictedHeight">*/}
                                    <EmortionView/>
                                    <EmortionView/>
                                    <EmortionView/>
                                {/*</div>*/}
                            </div>



                        </div>
                        <div className="col-xl-3 col-sm-12 mt-2">
                            <div className="card bg-light sticky-cols">
                                <div className="card-title p-3">
                                    <h3>Insights</h3>
                                </div>
                                <div className="card-body ">
                                    {/*<div className="profilePageRestrictedHeight">*/}
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                        <RevealedInsight insight={emortions[0].userInsight}/>
                                    {/*</div>*/}


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
        </>
    );
}