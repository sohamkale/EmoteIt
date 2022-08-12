import React, {useContext, useEffect, useState} from 'react'
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import axios from "axios";
import {LayoutContext} from "../shared/MainLayout";
import Error from "../shared/Error";


export default function Feedbacks(props){
    const {user,accessToken} = useContext(AuthenticationContext);
    const {setPageTitle} = useContext(LayoutContext);

    const [completed, setCompleted] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const Green = {
        backgroundColor: 'green'
    }

    useEffect(()=>{
        setPageTitle("Feedbacks")
    },[])

    useEffect(()=>{
        if(user){
            GetFeedback()
        }
    },[user, completed])

    function GetFeedback(){
        if(!completed){
            axios.get('/api/feedback').then((res)=>{
                setFeedbacks(res.data);
                console.log("Feedbacks!")
            }).catch((err)=>{
                console.log(err.message)})
        }else{
            axios.get('/api/feedback/completed').then((res)=>{
                setFeedbacks(res.data)
            }).catch((err)=>{
                console.log(err.message)
            })
        }
    }


    const ChangeFeedback = change =>{
        axios.put('/api/feedback', {id:change.feedbackId , statusId: change.value}).then((response)=>{
            GetFeedback()
        })
    }
    return (
        user?.typeId === 0?
        <div className="content-center">
            <table className="table table-hover table-responsive-md bg-light">
                <thead>
                {/*foreach feedback create a row*/}
                <tr>
                    <th scope="col">Created At</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Object Type Id</th>
                    <th scope="col">Message</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    feedbacks?.map((item, row)=>
                        <tr className={item.statusId===2?"green" : item.statusId===0?"orange" :
                            item.statusId===1?"yellow" : item.statusId===3?"blue":""} key={row}>
                          <td>{item.createdAt}</td>
                                <td>{item.createdBy?.name}</td>
                             <td>{item.objectTypeId}</td>
                            <td className="word-wrap" style={{maxWidth:"220px"}}>{item.message}</td>
                            <td>
                                <select value={
                                    (item.statusId===0)&&"New"|| (item.statusId===1)&&
                                    "Read"||(item.statusId===2)&&"In Progress"
                                    ||(item.statusId===3)&&"Completed"
                                } id={"select_" + row} onChange={
                                    (e)=>ChangeFeedback({
                                        feedbackId:item._id,
                                        value:e.target.value
                                    })
                                } className="form-control-sm">
                                    <option selected hidden>{
                                        (item.statusId===0)&&"New"|| (item.statusId===1)&&
                                        "Read"||(item.statusId===2)&&"In Progress"
                                        ||(item.statusId===3)&&"Completed"
                                    }
                                    </option>
                                    <option value="0">New</option>
                                    <option value="1">Read</option>
                                    <option value="2">In Progress</option>
                                    <option  value="3">Completed</option>
                                </select>
                            </td>
                        </tr>
                    )
                }

                </tbody>
            </table>
            <button onClick={()=>{
                setCompleted(!completed)
            }} className="btn btn-primary">{
                completed?"Hide Completed Feedbacks":"Show Completed Feedbacks"
            }</button>
        </div>:
            <Error/>
    );
}