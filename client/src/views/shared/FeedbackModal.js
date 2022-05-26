import React, {useContext, useEffect, useState} from 'react'
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";
import axios from "axios";

export default function FeedbackModal(){

    const {user,accessToken} = useContext(AuthenticationContext);
    const [objectTypeId, setObjectTypeId] = useState(1);
    const [typeId, setTypeId] = useState(1);
    const [message, setMessage] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const [modalBody, setModalBody] = useState();
    const [submitted, setSubmitted] = useState(false);

    function Submit(){
        var payload = {objectTypeId,typeId,message,subjectId};
        console.log(accessToken)
        console.log(JSON.stringify(payload))
        axios.post('/api/feedback',payload,{
            headers:{ "access-token": accessToken }
        }).then((res)=>{
            console.log(res.data);
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
          <div style={{zIndex:100}} class="modal fade" id="exampleModal" tabindex="100" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Please provide your feedback</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          {submitted?
                              <div>Your response has been submitted!</div>:
                              <div className="row">
                                  <label>Feedback Type</label>
                                  <select className="form-control" value={typeId} onChange={(e)=>setTypeId(parseInt(e.target.value))}>
                                      <option value="1">General Improvement Feedback</option>
                                      <option value="2">Complaint</option>
                                      <option value="3">Reporting</option>
                                  </select>

                                  <label>This feedback is about</label>
                                  <select className="form-control" value={objectTypeId} onChange={(e)=>setObjectTypeId(parseInt(e.target.value))}>
                                      <option value="1">Overall Application</option>
                                      <option value="2">Emortion</option>
                                      <option value="3">Insight</option>
                                      <option value="4">Profile</option>
                                  </select>

                                  <label>Feedback</label>
                                  <textarea className={"form-control"} value={message} onChange={(e)=>setMessage(e.target.value)}/>

                                  <label>Subject ID (if any)</label>
                                  <input type="text" className={"form-control"} value={subjectId} onChange={(e)=>setSubjectId(e.target.value)}/>
                              </div>
                          }
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          {
                              submitted?
                                  <></>:
                                  <button type="button" className="btn btn-primary" onClick={Submit}>Submit</button>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </>
    )
}