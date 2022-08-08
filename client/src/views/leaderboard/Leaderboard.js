import React, {useContext, useEffect, useState} from 'react'
import TopLeaderBoardCard from "./component/TopLeaderBoardCard";
import {LayoutContext} from "../shared/MainLayout";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Leaderboard(props) {
    const {setPageTitle} = useContext(LayoutContext);
    const [topTen, setTopTen] = useState();
    useEffect(() => {
        setPageTitle("Leaderboard")
    })
    const [stats, setStats] = useState(new Date());

    useEffect(() => {
        axios.get(`/api/leaderboard/top10`).then((res) => {
            setTopTen(res.data);
        })

         axios.get(`/api/leaderboard/stats`).then((res) => {
             setStats(res.data)
         })

    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="jumbotron leaderboard text-white w-100 p-0">
                    <div>
                        <span className="badge badge-light m-3">{new Date().toString()}</span>
                    </div>
                    <div className="leaderboard-header">
                        <h1 className="display-5 text-align-center text-bold">EMOTE IT LEADERBOARD</h1>
                    </div>
                    <div className="bg-white text-dark w-100 p-2">
                        <div className="row">
                            <div className={"col border-right"}>
                                <h5>All Time</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>Emortions</h5>
                                <h5 className="text-bold">{stats?.emortionCount}</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>Insights</h5>
                                <h5 className="text-bold">{stats?.insightCount}</h5>
                            </div>
                            <div className={"col border-right"}>
                                <h5>Emorters</h5>
                                <h5 className="text-bold">{stats?.newUserCount}</h5>
                            </div>

                            <div className={"col"}>
                                <h5>Realtionships</h5>
                                <h5 className="text-bold">{stats?.newRelationshipCount}</h5>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            <div className="row">

                {topTen?.slice(0, 3).map((item, index) =>
                    <div key={index} className="col-12 col-md-4 mb-2">
                        <TopLeaderBoardCard color={
                            index == 0 ? "goldenrod" : index == 1 ? "darkgrey" : index == 2 ? "brown" : "black"
                        } profileId={item._id}
                        />
                    </div>
                )}

                {/*<div className="col-4">
                    <TopLeaderBoardCard accuracy={25} color="darkgrey" name={"Mohammad A Immam"} score={10043}
                                        emortions={23} avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                </div>
                <div className="col-4">
                    <TopLeaderBoardCard accuracy={25} color="brown" name={"Mohammad A Immam"} score={10043}
                                        emortions={23}
                                        avgTime={"45"} insights={45} lastAnswered={"10/20/2023"}/>
                </div>*/}
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
                            <th scope="col">Score</th>
                        </tr>


                        </thead>
                        <tbody>
                        {topTen?.map((item, index) =>
                            <tr key={index}>

                                <td>
                                    <Link to={`/app/profile/${item._id}`}>
                                        {index + 1}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/app/profile/${item._id}`}>
                                        {item.name}
                                    </Link></td>
                                <td>{item.score}</td>

                            </tr>
                        )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
        ;
}