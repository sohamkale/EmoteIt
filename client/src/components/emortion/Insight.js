import React,{useState, useEffect} from 'react'
import {insight, emortions} from './InsightFunctions'
import AnsweringInterface from "./AnsweringInterface";
import RevealedInsights from "./RevelaedInsights";

export default function Insight(props){
/*

    function _GetInsight(){
        //TODO:: Gets the insight with matching 1. props.emortion.id  2.props.appUser.id
        var ins = insight;


        //TODO:: When you have the answer from the backend, figure out how much time has passed since the starting of answering.
        //If timeElapsed > 60, then everything is revealed
                //setAnswred({ answered: true, reveled: true});
        // else timeLeft = 60 - timeElapsed.
                // //setAnswered({ answered: true, reveled: false, timeLeft: timeLeft});
    }

    function _DidUserAnswer(){
        const emortion = props.emortion;
        const user = props.appUser;
        if(emortion!=null){
            return emortion.insightUserIds.includes(user?.id);
        }
    }
*/



    useEffect(()=>{
        //props.emortion will have the emortion object which contains the InsightUserIds
        //TODO: Figure out if the logged in user answered this emortion or not? Use Function _DidUserAnswer()

        //TODO: If user did not answer, setAnswered(false)
        //TODO: If user answer, setAnswered({reveleaed: true/false})

    /*    if(_DidUserAnswer()){
            setAnswered({
                answered:true,
                reveled:false
            })
        }*/
        },[]

    )


    if(props.emortion.message !== null){
        if(props.emortion.insights != null)
            return (<RevealedInsights emortion={props.emortion} appUser={props.appUser}/>);
        else return (<AnsweringInterface emortion={props.emortion}/>);
    }

    //did not answer! needs the option to start answering!
    return (
        <div className="post-react">
            <div className="gj-text-align-center">You have not answered this emortion yet!</div>
            <ul>

                <li className="comment-click">
                    <a href="javascript:void(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="feather feather-message-square iw-18 ih-18">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Start Answer Now
                    </a>
                </li>
            </ul>
        </div>
    );
}