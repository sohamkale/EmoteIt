import React, {useContext, useEffect, useState} from 'react'
import UserTitle from "../../../shared/components/UserTitle";
import axios from "axios";
import {AuthenticationContext} from "../../../../contexts/AuthenticationProvider";
import {DisplayPicture} from "../../../shared/components/DisplayPicture";
import Moment from "react-moment";

export default function RevealedInsights(props) {

    const {accessToken} = useContext(AuthenticationContext);
    const [insights, setInsights] = useState();

    useEffect(() => {
        if (props.emortionId)
            //make call to notify start of answering
            axios.get(`/api/emortion/insight/${props.emortionId}`,{headers:{"access-token":accessToken}}).then((res)=>{
                setInsights(res.data);
                console.log(res.data)
            })
    }, [props.emortionId])

    return (
        <div className="m-2 w-100">
            <div className="row">
                <span className="btn btn-sm btn-outline-warning disabled m-auto">INSIGHTS REVEALED</span>
            </div>
            {
                insights?.map((item,index)=>
                    <>
                        <SingleInsight key={index} insight={item}/>
                    </>
                )
            }
        </div>
    )
}

export function SingleInsight({insight}){

    const [reactShow, setReactShow] = useState(false);
    return(
        <div className="revealedInsight m-1 p-2">
            {/* Created By*/}
            <div className="row">
                <div className="col-2">
                    <DisplayPicture user={insight?.createdBy} width={30}/>
                </div>
                <div className="col-10">
                    <h6 className="mt-2 text-truncate">{insight?.createdBy?.name}</h6>
                </div>
            </div>
             {/*Created At*/}
            <div className="row">
                <div className="offset-2 col-10">
                    <Moment date={insight?.submittedAt}
                            durationFromNow={true} format={"Y [years] D[d] H[h] m[m] ago"} trim={"both"}
                    />
                </div>
            </div>
            <hr/>
            {/* Secret */}
            <div className="row m-1">
                    <div className="col-8 text-bold">{insight?.response} </div>
                <div className="col-4 text-align-right">
                    <div className="mb-2 ml-auto">
                        <span className="badge badge-dark">Score: {insight?.score}</span>
                        <i className="fa-solid fa-mobile-screen-button m-2"></i>
                    </div>
                </div>
            </div>

            {/*Reaction Row*/}
            <div className="row">
                {/*React Option Buttons*/}
                <div className="col-6 border-right">
                    <div className="btn-group dropup">
                        <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">

                            <i className="fas fa-smile mr-2"></i>
                            <span className="">React</span>
                        </button>
                        <div className="dropdown-menu post-react-dropdown-menu row">
                            <div className="post-react-item col">
                                <i className={`fa-regular fa-thumbs-up text-dark`}></i>
                                {/*{item.name}*/}
                            </div>
                            <div className="post-react-item col">
                                <i className={`fa-regular fa-thumbs-up text-dark`}></i>
                                {/*{item.name}*/}
                            </div>
                            <div className="post-react-item col">
                                <i className={`fa-regular fa-thumbs-up text-dark`}></i>
                                {/*{item.name}*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Emortion Reactions */}
                <div className="col-6">
                    <div className="btn-group dropright">
                        <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                            <i className="fa-regular fa-face-smile m-1 small"></i>
                            <span className="small">+12 Reacts</span>
                        </button>
                        <div className="dropdown-menu">
                            {/*Reactions Here*/}
                            <span className="dropdown-item small">Action</span>
                            <span className="dropdown-item small">Action</span>
                        </div>
                    </div>

                </div>
            </div>

           {/* <div className="row">
                <div className="col-2">

                </div>
                <div className="col-7 post-react">
                        {props.insight.response}
                    <ul style={{display:"inline"}}>
                        <li className="react-btn">
                            <a className="react-click" onClick={()=>setReactShow(!reactShow)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="feather feather-smile iw-18 ih-18">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                </svg>
                            </a>
                            <EmoteItReactOptions show={reactShow}/>
                        </li>
                    </ul>
                </div>

                <div className="col-3">
                    <div className="float-right">
                        {
                            props.insight.device == "phone"?
                            <i className="fas fa-mobile-alt m-2"></i>:
                                <i className="fas fa-desktop m-2"></i>
                        }
                        <span className="badge-pill badge-dark">{props.insight.score}</span>
                    </div>

                </div>
            </div>*/}
        </div>
    );
}