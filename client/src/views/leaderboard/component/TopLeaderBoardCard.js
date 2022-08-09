import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";
import {Link} from "react-router-dom";

export default function TopLeaderBoardCard(props) {
    const [profile, setProfile] = useState();
    const {accessToken} = useContext(AuthenticationContext)
    useEffect(() => {
        axios.get(`/api/profile/byId/${props.profileId}`, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setProfile(res.data);
        })
    }, [props.profileId])
    return (
        <Link to={`/app/profile/${profile?.user?._id}`}>
            <div className="card text-white"
                 style={{backgroundImage: `linear-gradient(-37deg, grey 0%, ${props.color} 100%)`}}>

                <div className="card-body m-2">
                    <div className={"row"}>

                        <h4 className={'text-white'}>{profile?.user?.name}</h4>

                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <h3 className="text-bold">{profile?.user?.score}</h3>
                        </div>
                        <div className="col">
                            <span
                                className="badge badge-light border-left ">{profile?.avgAnswerTime?.toFixed()/1000 ?? 0} seconds</span>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6>
                                <span>{((profile?.avgAccuracy ?? 0) * 100)?.toFixed(2)}% Accurate {props.insights} Insights &nbsp;{props.emortions} </span>
                            </h6>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <h6>Last Active {new Date(profile?.latestActive).toLocaleString()}</h6>
                    </div>
                </div>
                <div className="flaks-img">
                    <img src={require(`../../../assets/img/leaderboard/${props.color}.png`).default}
                         className="img-fluid blur-up lazyloaded" alt="snow" width={"80px"} style={{opacity: "60%"}}/>
                </div>
                <div className="snowflakes" aria-hidden="true">
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                    <div className="snowflake">
                        ❅
                    </div>
                    <div className="snowflake">
                        ❆
                    </div>
                </div>
            </div>
        </Link>
    )
}