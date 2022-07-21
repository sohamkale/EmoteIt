import React, {useContext, useState} from 'react'
import EmortionView from "./components/EmortionView";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";

export default function Emortion(props){
    const {accessToken} = useContext(AuthenticationContext);
    const [emortion, setEmortion] = useState();
    const {id:emortionId} = useParams();

    function GetEmortion(){
        axios.get(`/api/emortion/emortion/${emortionId}`, {headers:{
                'access-token': accessToken
            }}).then((res)=>{
            setEmortion(res.data);
        })
    }

    useState(()=>{
        GetEmortion();
    })

    return(
        <div>
            <div className="col-12 col-md-8">
            <EmortionView emortion={emortion} GetEmortion={GetEmortion}/>
            </div>
        </div>
    )
}