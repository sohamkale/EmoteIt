import React, {useState} from 'react'
import TopLeaderBoardCard from "../../components/leaderboard/TopLeaderBoardCard";
import LeaderboardTable from "./LeaderboardTable";

export default function Leaderboard(props){
    const [date, setDate] = useState(new Date());
    
    return (
        <div className="w-100">

            <div className="event-cover bg-theme">
                <div className="event-img">
                    {/*<img src={require("../../assets/images/leaderboard/trophy.jpg").default} className="w-100" alt=""/>*/}
                    <div className="event-content">
                        <h1 className="gj-text-align-center">EmoteIt Leaderboard</h1>
                    </div>
                    <div className="cover-img-detail">
                        <span>{date.toString()}</span>
                        {/*<h3>London, United kingdom</h3>*/}
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
                        {/*<li>*/}
                        {/*    <h4></h4>*/}
                        {/*    <h2></h2>*/}
                        {/*</li>*/}

                    </ul>
                </div>
            </div>

            <div className="section-t-space">
                <div className="row">
                    <div className="col-4">
                        <TopLeaderBoardCard color={"goldenrod"} name={"Mohammad A Immam"}
                                            accuracy={25} score={10043} emortions={23} avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                    </div>
                    <div className="col-4">
                        <TopLeaderBoardCard accuracy={25} color="darkgrey" name={"Mohammad A Immam"} score={10043}
                                            emortions={23} avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                    </div>
                    <div className="col-4">
                        <TopLeaderBoardCard accuracy={25} color="brown" name={"Mohammad A Immam"} score={10043} emortions={23}
                                            avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-6 m-auto"}>
                        <LeaderboardTable tableName={"Global leaderboard"}/>
                    </div>
                   {/* <div className={"col-6"}>
                        <LeaderboardTable tableName={"Friend leaderboard"}/>
                    </div>*/}
                </div>
            </div>


        </div>
    );
}