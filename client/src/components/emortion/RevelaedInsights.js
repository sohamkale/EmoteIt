import React, {useState} from 'react'
import UserTitle from "../shared/UserTitle";
import EmoteItReactOptions from "../shared/EmoteItReactOptions";

export default function RevealedInsights(props) {

    return (
        <div className="comment-section pb-0">
            <div className="comments d-block">
                <div className="main-comment">
                    <RevealedInsight insight={props.emortion.userInsight}/>
                    {
                        props.emortion.insights.map((item,index)=>
                            <>
                                <RevealedInsight insight={item}/>
                            </>
                                )
                    }
                </div>

            </div>

        </div>
    )
}

export function RevealedInsight(props){
    const imgStyle={
        backgroundImage: "url(&quot;../assets/images/user-sm/1.jpg&quot;)",
        backgroundSize: "cover"
    }
    const [reactShow, setReactShow] = useState(false);
    return(
        <div className="revealedInsight m-1 p-2">
            <div className="row">
                <UserTitle/>
            </div>
            <div className="row">
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
            </div>
        </div>
    );
}