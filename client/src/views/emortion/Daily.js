import React, {useContext, useState} from 'react'
import EmortionView from "./components/EmortionView";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";

export default function Daily(props){
    const {accessToken} = useContext(AuthenticationContext);
    const [emortion, setEmortion] = useState();
    const [msg,setMsg]= useState("")


    function GetEmortion(){
        axios.get(`/api/emortion/daily`, {headers:{
                'access-token': accessToken
            }}).then((res)=>{
                console.log(emortion)
            setEmortion(res.data);

        }).catch((err) => {
            setMsg(`error! status: ${err.response?.status}, message: ${err.response?.data?.message}`);
            console.log(err.response);

        })
    }

    useState(()=>{
        GetEmortion();
    },[])

    return(
        <>

            <div className={"row"}>
                <div className="m-auto text-warning">
                    {msg}
                </div>
            </div>
            <div className="col-12 col-md-8">
                <EmortionView emortion={emortion} GetEmortion={GetEmortion}/>
            </div>
        </>
    )
}

