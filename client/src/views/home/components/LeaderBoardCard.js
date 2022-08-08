import React from 'react'
import {Link} from "react-router-dom";


export default function LeaderBoardCard(props) {
    {
        return (
            <Link to={`/app/profile/${props.user?._id}`}>
                <div className="card leaderboard-card m-1">
                    <div
                        className="card-title p-0 m-0 text-align-center text-bold bg-dark text-white rounded text-truncate">
                        {props.user?.name}
                    </div>
                    <img className="card-img-top rounded"
                         src={props.user?.pictureUrl ?? require("../../../assets/img/extra/bg-ej.png").default}
                         alt="Card image cap"/>
                    <div className="bg-dark text-white rounded">
                        <div className="row text-align-center">
                            <div className="col border-right">
                                <h5 className="m-0">{props.user?.score}</h5>
                                <div className="small m-0">Score</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}