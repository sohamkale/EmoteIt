import React, {useState} from 'react'
import {Link} from "react-router-dom";

export default function Translations(props){
    return (
        <div className="row">
            <TranslationGroup/>
            <TranslationGroup/>
        </div>
    );
}

function TranslationGroup({table}){
    return (
        <div className="col-3">
            <div className="">
                <div className="leaderboard-table section-b-space">
                    <div className="card-title">
                        <h3>{table?.name}</h3>
                    </div>
                    <div className="table-sec">
                        <table className="table table-hover table-responsive-md">
                            <thead>
                            <tr>
                                <th scope="col">RID</th>
                                <th scope="col">Text</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <Translation/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Translation({translation}){
    const [editing, setEditing] = useState(false);
    return(
        <tr>
            {
                editing?
                    <td>
                        <input className="form-control" defaultValue={"20"}/>
                    </td>:
                    <td>
                        20
                    </td>
            }
            {
                editing?
                    <td>
                        <input className="form-control" defaultValue={"New"}/>
                    </td>:
                    <td>
                        New
                    </td>
            }
            {
                editing?<></>:
                    <td>
                        <div className="row">
                            <div className="col" onClick={()=>setEditing(true)}>
                                <i className="far fa-edit"></i>
                            </div>
                            <div className="col">
                                <i className="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </td>
            }
        </tr>
    );
}