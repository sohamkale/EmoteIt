import React, {useState, useContext, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'


export default function Translations(props){
    const [status,setStatus] = useState(false);
    const [translation, setTranslation] = useState(null);
    const [editing, setEditing] = useState(false);
    const [allTrans, setAllTrans] = useState(null)
    let captureInput = React.createRef()
    let captureRID = React.createRef()
    let captureLabel = React.createRef()
    function getTranslations() {
        axios.get('/api/translation/' + captureInput.current.value).then((res)=>{
                setTranslation(res.data[0]);
                console.log(translation);
                GetAll()
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    function editTranslation(){
        translation.rid = captureRID.current.value;
        translation.label = captureLabel.current.value;
        axios.put('/api/translation/' + translation?.tableIdntfr, {
            label:translation.label,
            rid:translation.rid,
            _id:translation._id
        }
        ).then(()=>{
            setEditing(false);
            GetAll()
        })
    }

    function GetAll(){
        axios.get('/api/translations').then((res)=>{
            setAllTrans(res.data)
        })
    }

    useEffect(() => {
        GetAll()
    },[status])

    function TranslationGroup({table}){
        return (
            <>
            <div className="col-3">
                <div className="">
                    <div className="leaderboard-table section-b-space">
                        <div className="card-title">
                            <h3>{translation?.tableIdntfr}</h3>
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


                                <tr>
                                    {
                                        editing?
                                            <td>
                                                <input ref={captureRID} className="form-control" defaultValue={translation?.rid}/>
                                            </td>:
                                            <td>
                                                {translation?.rid}
                                            </td>
                                    }
                                    {
                                        editing?
                                            <td>
                                                <input ref={captureLabel} className="form-control" defaultValue={ translation?.label }/>
                                            </td>:
                                            <td>
                                                {translation?.label}
                                            </td>
                                    }
                                    {
                                        editing?<><button onClick={()=>{
                                            editTranslation()
                                        }
                                            } className="btn btn-primaty">Update</button></>:
                                            <td>
                                                <div className="row">
                                                    <div className="col" onClick={()=>setEditing(true)}>
                                                        <i className="far fa-edit"/>
                                                    </div>
                                                    <div className="col">
                                                        <i className="fas fa-trash-alt"/>
                                                    </div>
                                                </div>
                                            </td>
                                    }
                                </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

                <div className="col-4">

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Translation Names</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            allTrans?.map((item,row)=>
                                <tr key={row}>
                                    <td>{item.tableIdntfr}</td>
                                </tr>
                            )
                        }


                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <label htmlFor="name">Name:</label>
                <input ref={captureInput} type="text"/>
                <button onClick={()=>{
                    getTranslations()
                }}>Search</button>
                <button
                >Create</button>
            </div>
            <div className="row">
                <TranslationGroup translation={translation}/>
            </div>
        </>
    );
}