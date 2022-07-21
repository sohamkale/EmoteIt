import React, {useContext, useEffect, useState} from 'react'
import EmortionInsights from "./insight/EmortionInsights";
import {Link} from "react-router-dom";
import {DisplayPicture} from "../../shared/components/DisplayPicture";
import Moment from "react-moment";
import {EmojiDiv} from "./EmojiDiv";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";
import AnsweringInterface from "./insight/AnsweringInterface";
import axios from "axios";
import {LayoutContext} from "../../shared/MainLayout";


export default function EmortionView({emortion, answeringInterface, GetEmortion}) {
    const {user, accessToken} = useContext(AuthenticationContext);
    const {categories} = useContext(LayoutContext);

    const[likes, setLikes] = useState([]);

    function GetEmortionLikes(){
        axios.get(`/api/emortion/react/${emortion?._id}`).then((res)=>{
            if(res.data)
                setLikes(res.data);
            else setLikes([]);
        })
    }

    function LikeEmortion(){
        axios.put(`/api/emortion/react/${emortion?._id}`,null,{headers:
                {'access-token':accessToken}})
            .then((res)=>{
                GetEmortion();
                GetEmortionLikes();
        })
    }

    useEffect(()=>{
        if(emortion?._id)
            GetEmortionLikes();
    },[emortion])

    return (
            <div className="card mb-2" style={{width: "98%"}}>
                <div className={"card-body"}>
                    {/* Created By*/}
                    <div className="row">
                        <div className="col-2">
                            <DisplayPicture user={emortion?.createdBy} width={50}/>
                        </div>
                        <div className="col-10">
                            <Link to={`/app/profile/${emortion?.createdBy?._id}`}>
                                <h5 className="mt-3">{emortion?.createdBy?.name}</h5>
                            </Link>
                        </div>
                    </div>
                    {/* Created At*/}
                    <div className="row">
                        <div className="offset-2 col-10 row">
                            <div className="col-5 border-right small">
                                <Link to={`/app/emortion/${emortion?._id}`}>
                                    Posted: <Moment className="" date={emortion?.createdAt}
                                                    durationFromNow={true} format={"Y [years] D[d] H[h] m[m] ago"}
                                                    trim={"both"}/>
                                </Link>
                                {
                                    user?._id?.toString() == emortion?.createdBy?._id ?
                                        <span className="badge badge-primary m-1">SELF</span> : <></>
                                }
                            </div>

                            <div className="col-7 small">
                                Expires: <Moment className="" date={emortion?.expiresAt} format={"D-M-Y hh:mm:ss A"}/>

                                {
                                    new Date(emortion?.expiresAt) <= new Date() ?
                                        <span className="badge badge-danger m-1">EXPIRED</span> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    {/* Secret */}
                    <div className="row mt-3">
                        <div className="col-10">
                            Category: &nbsp;
                            {categories.find(x=>x.rid == emortion?.categoryId)?.label??"not found"}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-10">
                            Insight: &nbsp;
                            {emortion?.secret ?? "Not Revealed"}
                        </div>
                    </div>
                    {/* The emojis*/}
                    <div className="row m-2">
                        {emortion?.message?.map((item, index) => <EmojiDiv key={index} eId={item}
                                                                           index={index}/>)}


                    </div>
                    <hr/>

                    {/*Reaction Row*/}
                    <div className="row">
                        {/*React Option Buttons*/}
                        <div className="col-4 border-right">
                            <div className="btn-group dropup">
                                <button type="button" className="btn btn-light" onClick={LikeEmortion}>
                                    {
                                        likes?.some(x=>x._id == user?._id)?
                                            <i className="fa-solid fa-heart-pulse"></i>:
                                            <i className="fa-regular fa-heart"></i>

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
                                    <span className="small">+{likes?.length} Reacts</span>
                                </button>
                                <div className="dropdown-menu">
                                    {/*Reactions Here*/}
                                    {
                                        likes.map((item, index)=>
                                            <Link to={`/app/profile/${item._id}`}>
                                                <span key={index} className="dropdown-item small"><DisplayPicture user={item} width={30} /> &nbsp;{item.name}</span>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                        {/* Number of Insights*/}
                        <div className="col-4">
                            <div className="btn-group">
                                <div type="button" className="m-2"
                                     aria-expanded="false">
                                    <i className="fa-regular fa-message m-1 small"></i>
                                    <span className="small">{emortion?.insightUIDs?.length} Insights</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr/>
                    {/* EmortionInsights Portion */}

                    <div className="row w-100 m-1 rounded bg-light">
                    {
                        answeringInterface?
                            <AnsweringInterface emortionId={emortion?._id}/>:
                                <EmortionInsights emortionId={emortion?._id} secret={emortion?.secret}
                                                  expiresAt={emortion?.expiresAt}/>
                    }
                    </div>
                </div>

            </div>
    )
}