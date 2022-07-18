import React,{useState, useEffect} from 'react'
import RevealedInsights from "./RevealedInsights";
import AnsweringInterface from "./AnsweringInterface";

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

    );

    return <RevealedInsights/>


    /*if(props.emortion?.secret !== null){
        if(props.emortion?.insights != null)
            return (<RevealedInsights emortionId={props.emortion?._id}/>);

        else return (<AnsweringInterface emortionId={props.emortion?._id}/>);
    }

    //did not answer! needs the option to start answering!
    return (
        <div className="row m-auto text-align-center">
            <div className={"col-12 mb-2"}>
                <div className="btn btn-light">You have not answered this emortion yet!</div>
            </div>

            <div className={"col-12"}>
                <div className="btn btn-dark">
                    <i className="fa-regular fa-circle-play m-1"></i>
                    Start Answer Now
                </div>
            </div>
        </div>
    );*/
}