import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";

export const Feedback = ()=>{

    const {user,accessToken} = useContext(AuthenticationContext);
    const [objectTypeId, setObjectTypeId] = useState(1);
    const [typeId, setTypeId] = useState(1);
    const [message, setMessage] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function Submit(){
        var payload = {objectTypeId,typeId,message,subjectId};
        axios.post('/api/feedback',payload,{
            headers:{ "access-token": accessToken }
        }).then((res)=>{
            setSubmitted(true);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        setSubmitted(false);
    },[objectTypeId])

    return (
        <>
            <button className={"btn btn-dark"} type="button" data-toggle="modal"
                    data-target="#exampleModal">
                <i className="fa-solid fa-comment"></i>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="100" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Please provide your feedback</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body m-3">
                            <div className="row border-bottom mb-2">Note: Feedback is not anonymous. Developers will retreive your username
                                incase they need to contact you back.</div>
                            {submitted ?
                                <div>Your response has been submitted!</div> :
                                <div className="row">
                                    <label>Feedback Type</label>
                                    <select className="form-control" value={typeId}
                                            onChange={(e) => setTypeId(parseInt(e.target.value))}>
                                        <option value="1">General Improvement Feedback</option>
                                        <option value="2">Complaint</option>
                                        <option value="3">Reporting</option>
                                    </select>

                                    <label>This feedback is about</label>
                                    <select className="form-control" value={objectTypeId}
                                            onChange={(e) => setObjectTypeId(parseInt(e.target.value))}>
                                        <option value="1">Overall Application</option>
                                        <option value="2">Emortion</option>
                                        <option value="3">Insight</option>
                                        <option value="4">Profile</option>
                                    </select>

                                    <label>Feedback</label>
                                    <textarea className={"form-control"} value={message}
                                              onChange={(e) => setMessage(e.target.value)}/>

                                {/*    <label>Subject ID (if any)</label>
                                    <input type="text" className={"form-control"} value={subjectId}
                                           onChange={(e) => setSubjectId(e.target.value)}/>*/}
                                </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {
                                submitted ?
                                    <></> :
                                    <button type="button" className="btn btn-primary" onClick={Submit}>Submit</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}