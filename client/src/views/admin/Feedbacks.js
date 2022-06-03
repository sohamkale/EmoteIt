import React, {useContext, useEffect, useState} from 'react'
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";
import axios from "axios";

export default function Feedbacks(props){

    const {user,accessToken} = useContext(AuthenticationContext);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(()=>{
        if(user){
            axios.get('/api/feedback').then((res)=>{
                setFeedbacks(res.data);
            }).catch((err)=>{
                console.log(err.message)})
        }

    },[user])

    return (
        <div className="content-center">
            <div className="leaderboard-table section-b-space">
                <div className="card-title">
                    <h3>Current Unresolved Feedbacks</h3>
                </div>
                <div className="table-sec">
                    <table className="table table-hover table-responsive-md">
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
                            feedbacks.map((item, row)=>
                                <tr>
                                        <td>{item.createdAt}</td>
                                        <td>{item.createdBy}</td>
                                        <td>{item.objectTypeId}</td>
                                        <td className="word-wrap" style={{maxWidth:"220px"}}>{item.message}</td>
                                        <td>
                                            <select className="form-control-sm">
                                                <option selected hidden>{item.statusId}</option>
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
                </div>
            </div>
        </div>
    );
}