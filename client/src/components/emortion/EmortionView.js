import React, {useState} from 'react'
import UserTitle from "../shared/UserTitle";
import {emortions} from "./InsightFunctions";
import Insight from "./Insight";
import './emortion.scss'
import {Link} from "react-router-dom";
import EmoteItReactOptions from "../shared/EmoteItReactOptions";

const imgStyle={
    backgroundImage: "url(&quot;../assets/images/user-sm/1.jpg&quot;)",
    backgroundSize: "cover"
}


export default function EmortionView(props){

    const [emortion, setEmortion] = useState(emortions[0]);
    const [reactShow, setReactShow] = useState(false);

    return (
            <div className="card post-wrapper col-grid-box d-block m-auto mb-5" style={{width: "98%"}}>
                <div className="m-4">
                    <div className="row">
                        <UserTitle/>
                    </div>
                    <div className="row">
                        <div className={"col-2"}></div>
                        <div className="col-10">


                            <div className="detail-box">
                                {
                                    emortion.message === null || emortion.insights == null ?
                                        <b>Answer this emortion to reveal the message</b>
                                        :<h3>{emortion.message}</h3>

                                }
                                {/*<h5 className="tag"><span>#ourcutepuppy,</span> #puppy, #birthday, #dog</h5>*/}
                            </div>
                        </div>
                    </div>
                    <div className="row"><br/></div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-5">

                                    {/*   <ul>
                        <li className="bg-size lazyloaded"
                            style={imgStyle}>
                            <img src={require("../../assets/images/user-sm/1.jpg").default} className="img-fluid lazyload bg-img d-block"
                                 alt=""/>
                        </li>

                    </ul>*/}
                            <span>+12 emorters reacted</span>
                                </div>
                        <div className="col-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="feather feather-message-square iw-16 ih-16">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>26</span> Insights

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="post-react">
                        <ul>
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
                                    react
                                </a>
                                <EmoteItReactOptions show={reactShow}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row insight">
                    <Insight emortion={emortion} appUser={props.appUser}/>
                </div>
                {
                    props.expanded ? <></>:
                        <div className="row">
                            <div className="post-react">
                                <ul>
                                    <li className="react-btn">
                                        <Link to={"/app/emortion/"+emortion.id}>
                                            <div className="react-click">
                                                View More
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                }
            </div>
    )
}