import React, {useContext, useState} from 'react'
import EmortionView from "./components/EmortionView";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";

export default function Emortion(props){
    const {accessToken} = useContext(AuthenticationContext);
    const [emortion, setEmortion] = useState();
    const [msg,setMsg]= useState("")

    const {id:emortionId} = useParams();

    function GetEmortion(){
        axios.get(`/api/emortion/emortion/${emortionId}`, {headers:{
                'access-token': accessToken
            }}).then((res)=>{
            setEmortion(res.data);

        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);

        })
    }

    useState(()=>{
        GetEmortion();
    })

    return(
        <div>
            <div className={"row"}>
                <div className="m-auto text-warning">
                    {msg}
                </div>
            </div>
            {
                (emortion === undefined || emortion === null)?<center><div className="text-center spinner-border"/></center>:
                <div className="col-12 col-md-8">
                    <EmortionView emortion={emortion} GetEmortion={GetEmortion}/>
                </div>
            }
        </div>
    )
}