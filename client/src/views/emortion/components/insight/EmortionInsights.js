import React, {useState, useEffect, useContext} from 'react'
import RevealedInsights from "./RevealedInsights";
import AnsweringInterface from "./AnsweringInterface";
import {AuthenticationContext} from "../../../../contexts/AuthenticationProvider";
import {Link} from "react-router-dom";

export default function EmortionInsights({emortionId, secret, expiresAt}) {

    //if you have secret, then show answer
    if (secret != null)
        return (<RevealedInsights emortionId={emortionId}/>);

    //if emortion has not expired yet,
    else if(new Date(expiresAt) > new Date()){
        //TODO: - check if I started answering already:
        //yes? -check the condition below
                // do I still have time left? no? show revealed insights
        //                                    yes - redirect me to answering page automatically!

        // no? Show the button below
        //else
        return (
            <div className="row m-auto text-align-center">
                <div className={"col-12 mb-2"}>
                    <div className="btn btn-light">You have not answered this emortion yet!</div>
                </div>

                <div className={"col-12"}>
                    <Link to={`/app/insight/${emortionId}`}>
                        <div className="btn btn-dark">
                            <i className="fa-regular fa-circle-play m-1"></i>
                            Start Answer Now
                        </div>
                    </Link>

                </div>
            </div>
        );
    }

    else return (<div>Loading..</div>)




        /* return <RevealedInsights/>*/


    /*if(props.emortion?.secret !== null){
        if(props.emortion?.insights != null)
            return (<RevealedInsights emortionId={props.emortion?._id}/>);

        else return (<AnsweringInterface emortionId={props.emortion?._id}/>);
    }


   */

}