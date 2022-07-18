import React, {useContext, useEffect, useState} from 'react'
import Insight from "./insight/Insight";
import {Link} from "react-router-dom";
import {DisplayPicture} from "../../shared/components/DisplayPicture";
import Moment from "react-moment";
import {EmojiDiv} from "./EmojiDiv";
import $ from 'jquery'
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";


export default function EmortionView({emortion, expanded}) {
    const {accessToken} = useContext(AuthenticationContext);
    useEffect(() => {
        /* $('.dropup').hover(function(){
             $('.dropdown-toggle', this).trigger('click');
         });*/
    })

    const [reactShow, setReactShow] = useState(false);

    return (

        <>
            {/*token: {accessToken}*/}
            <div className="card mb-2" style={{width: "98%"}}>
                <div className={"card-body"}>
                    {/* Created By*/}
                    <div className="row">
                        <div className="col-2">
                            <DisplayPicture user={emortion?.createdBy} width={50}/>
                        </div>
                        <div className="col-10">
                            <h5 className="mt-3">{emortion?.createdBy?.name}</h5>
                        </div>
                    </div>
                    {/* Created At*/}
                    <div className="row">
                        <div className="offset-2 col-10 row">
                            <div className="col-5 border-right small">
                                Posted: <Moment className="" date={emortion?.createdAt}
                                                durationFromNow={true} format={"Y [years] D[d] H[h] m[m] ago"}
                                                trim={"both"}/>
                            </div>

                            <div className="col-7 small">
                                Expires: <Moment className="" date={emortion?.expiresAt} format={"D-M-Y hh:mm:ss A"}/>
                            </div>
                        </div>
                    </div>
                    {/* Secret */}
                    <div className="row mt-3">
                        <div className="col-10">
                            Insight: &nbsp;
                            {emortion?.secret??"Not Revealed"}
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
                                <button type="button" className="btn btn-light dropdown-toggle"
                                        data-toggle="dropdown"
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
                        <div className="col-4 border-right">
                            <div className="btn-group dropright">
                                <button type="button" className="btn btn-light dropdown-toggle"
                                        data-toggle="dropdown"
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
                        {/* Number of Insights*/}
                        <div className="col-4">
                            <div className="btn-group">
                                <div type="button" className="m-2"
                                     aria-expanded="false">
                                    <i className="fa-regular fa-message m-1 small"></i>
                                    <span className="small">26 Insights</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr/>
                    {/* Insight Portion */}
                    <div className="row w-100 m-1 rounded bg-light">
                        <Insight emortion={emortion}/>
                    </div>
                </div>

            </div>
        </>
    )
}