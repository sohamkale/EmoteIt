import React from 'react'

export default function Feedbacks(props){
    return (
        <div className="content-center">
            <div className="leaderboard-table section-b-space">
                <div className="card-title">
                    <h3>Current Unresolved Feedbacks</h3>
                </div>
                <div className="table-sec">
                    <table className="table table-hover table-responsive-md">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Object Type Id</th>
                            <th scope="col">Message</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>20</td>
                                <td>10/20/2021</td>
                                <td>Ashiqul Jeem</td>
                                <td>76643</td>
                                <td className="word-wrap" style={{maxWidth:"220px"}}>Jeem sent a friend request Asdnnnasnd as hdhnasdhasdfnasd asdnashdashf</td>
                                <td>Emortion</td>
                                <td>
                                    <select className="form-control-sm">
                                        <option>New</option>
                                        <option>Read</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}