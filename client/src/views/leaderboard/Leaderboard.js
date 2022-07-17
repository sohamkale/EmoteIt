import React, {useContext, useEffect, useState} from 'react'
import TopLeaderBoardCard from "./component/TopLeaderBoardCard";
import {LayoutContext} from "../shared/MainLayout";

export default function Leaderboard(props) {
    const {setPageTitle} = useContext(LayoutContext);
    useEffect(() => {
        setPageTitle("Leaderboard")
    })
    const [date, setDate] = useState(new Date());

    return (
        <>
            <div className="row">
                <div className="jumbotron leaderboard text-white w-100 p-0">
                    <div>
                        <span className="badge badge-light m-3">{date.toString()}</span>
                    </div>
                    <div className="leaderboard-header">
                        <h1 className="display-5 text-align-center text-bold">EMOTE IT LEADERBOARD</h1>
                    </div>
                    <div className="bg-white text-dark w-100 p-2">
                        <div className="row">
                            <div className={"col border-right"}>
                                <h5>This Week</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>Emortions</h5>
                                <h5 className="text-bold">26</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>Insights</h5>
                                <h5 className="text-bold">46</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>New Emorters</h5>
                                <h5 className="text-bold">11</h5>
                            </div>

                            <div className={"col"}>
                                <h5>Realtionships</h5>
                                <h5 className="text-bold">18</h5>
                            </div>


                        </div>
                    </div>
                </div>
                {/*<div className="event-cover bg-theme">
                    <div className="event-img">
                        <img src={require("../../assets/images/leaderboard/trophy.jpg").default} className="w-100" alt=""/>
                        <div className="event-content">
                            <h1 className="gj-text-align-center">EmoteIt Leaderboard</h1>
                        </div>
                        <div className="cover-img-detail">
                            <span>{date.toString()}</span>
                            <h3>London, United kingdom</h3>
                        </div>

                    </div>
                    <div className="event-timeline weather-timeline">
                        <div className="timeline-title">
                            <div className="media">
                                <div className="media-body">
                                    <h4>This week</h4>
                                    <h2></h2>
                                </div>
                            </div>
                        </div>
                        <ul className="timeline-content">
                            <li>
                                <h4>Emortions</h4>
                                <h2>26</h2>
                            </li>
                            <li>
                                <h4>Insights</h4>
                                <h2>46</h2>
                            </li>
                            <li>
                                <h4>New Emorters</h4>
                                <h2>11</h2>
                            </li>
                            <li>
                                <h4>Realtionships</h4>
                                <h2>18</h2>
                            </li>
                            <li>
                                <h4></h4>
                                <h2></h2>
                            </li>

                        </ul>
                    </div>
                </div>*/}
            </div>
            <div className="row">
                <div className="col-4">
                    <TopLeaderBoardCard color={"goldenrod"} name={"Mohammad A Immam"}
                                        accuracy={25} score={10043} emortions={23} avgTime={"45"} insights={45}
                                        lastAnswered={"10/20/2023"}/>
                </div>
                <div className="col-4">
                    <TopLeaderBoardCard accuracy={25} color="darkgrey" name={"Mohammad A Immam"} score={10043}
                                        emortions={23} avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                </div>
                <div className="col-4">
                    <TopLeaderBoardCard accuracy={25} color="brown" name={"Mohammad A Immam"} score={10043}
                                        emortions={23}
                                        avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                </div>
            </div>
            <hr/>
            <div className={"row"}>
                <div className={"col m-auto"}>
                    <h3>Global Leaderboard</h3>
                    <table className="table table-hover table-responsive-md bg-light">
                        <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Level</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mohammad Asfaq Immam</td>
                            <td>Level: 2</td>
                            <td>5237</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
        ;
}