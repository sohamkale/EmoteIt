import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthenticationContext} from "../../../../contexts/AuthenticationProvider";
import {DisplayPicture} from "../../../shared/components/DisplayPicture";
import Moment from "react-moment";
import {Link} from "react-router-dom";

export default function RevealedInsights(props) {

    const {accessToken} = useContext(AuthenticationContext);
    const [insights, setInsights] = useState();
    const [msg, setMsg] = useState("");


    function GetInsights() {
        if (props.emortionId)
            //make call to notify start of answering

            axios.get(`/api/emortion/insight/${props.emortionId}`, {headers: {"access-token": accessToken}})
                .then((res) => {
                setInsights(res.data);

            }).catch((err) => {
                setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
                console.log(err.response);
            })
    }

    useEffect(() => {
        GetInsights();
    }, [props.emortionId])

    return (
        <div className="m-2 w-100">
            <div className="row">
                <div className={"m-auto text-warning"}>{msg}</div>
            </div>
            <div className="row">
                <span className="btn btn-sm btn-outline-warning disabled m-auto">INSIGHTS REVEALED</span>
            </div>
            {
                (insights === undefined || insights === null)?<center><div className="text-center spinner-border"/></center>:
                insights?.map((item, index) =>
                    <React.Fragment key={index}>
                        <SingleInsight insight={item} GetInsights={GetInsights} setMsg={setMsg}/>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export function SingleInsight({insight, GetInsights, setMsg}) {

    const {user, accessToken} = useContext(AuthenticationContext);
    const [reacting, setReacting] = useState(false);


    function LikeInsight() {
        setReacting(true);
        axios.put(`/api/emortion/insight/${insight?._id}`, null, {
            headers:
                {'access-token': accessToken}
        })
            .then((res) => {
                GetInsights();
                setReacting(false);
            }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);
        })
    }

    return (
        <div className="revealedInsight m-2 p-2 w-100">
            {/* Created By*/}
            <div className="row">
                <div className="col-2">
                    <DisplayPicture user={insight?.createdBy} width={30}/>
                </div>
                <div className="col-10">
                    <Link to={`/app/profile/${insight?.createdBy?._id}`}>
                        <h6 className="mt-2 text-truncate">{insight?.createdBy?.name}</h6>
                    </Link>
                </div>
            </div>
            {/*Created At*/}
            <div className="row">
                <div className="offset-2 col-10">
                    <Link to={`/app/emortion/${insight?.emortionId}`}>
                        Posted: <Moment date={insight?.submittedAt}
                                        durationFromNow={true} format={"Y [years] D[d] H[h] m[m] ago"} trim={"both"}
                    />
                    </Link>
                </div>
            </div>
            <hr/>
            {/* Secret */}
            <div className="row m-1">
                <div className="col-7 text-bold">
                    {insight?.response.map((item, index) =>
                        <span key={index}>{item.toUpperCase()} &nbsp;</span>)}
                </div>
                <div className="col-5 text-align-right">
                    <div className="mb-2 ml-auto">
                        <span className="badge badge-dark m-1">Score: {insight?.score}</span>
                        <span className="badge badge-dark">Accuracy: {(insight?.accuracy * 100)?.toFixed(2)}%</span>

                        <span className="badge badge-dark m-1">
                            <Moment diff={insight?.createdAt} unit={"seconds"}>{insight?.submittedAt}</Moment> seconds
                        </span>
                        {
                            insight?.deviceId === 0 ?
                            <i className="fa-solid fa-mobile-screen-button m-2"/> :
                            <i className="fa-solid fa-desktop m-2"/>}
                    </div>
                </div>
            </div>

            {/*Reaction Row*/}
            <div className="row">
                {/*React Option Buttons*/}
                <div className="col-4 border-right">
                    <div className="btn-group dropup">
                        <button type="button" className="btn btn-light " onClick={(e)=>{LikeInsight()}}>
                            {
                                reacting?
                                    <i className="fa-solid fa-heart-pulse heart-rotating"></i> :
                                    insight?.reactionIds?.some(x => x._id == user?._id) ?
                                    <i className="fa-solid fa-heart-pulse"></i> :
                                    <i className="fa-regular fa-heart "></i>

                            }

                            <span className="ml-1">React</span>
                        </button>
                        {/* <div className="dropdown-menu post-react-dropdown-menu w-25">
                                    <div className="post-react-item col">
                                        <i className={`fa-regular fa-thumbs-up text-dark`}></i>
                                        {item.name}
                                    </div>
                                </div>*/}
                    </div>
                </div>
                {/* Emortion Reactions */}
                <div className="col-4 border-right">
                    <div className="btn-group dropright">
                        <button type="button" className="btn btn-light dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">
                            <i className="fa-regular fa-face-smile m-1 small"></i>
                            <span className="small">+{insight?.reactionIds?.length} Reacts</span>
                        </button>
                        <div className="dropdown-menu">
                            {/*Reactions Here*/}
                            {
                                insight?.reactionIds?.map((item, index) =>
                                    <Link key={index} to={`/app/profile/${item._id}`}>
                                        <span key={index} className="dropdown-item small"><DisplayPicture user={item}
                                                                                                          width={30}/> &nbsp;{item.name}</span>
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}