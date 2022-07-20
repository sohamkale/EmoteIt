import React, {useState} from 'react'
import EmortionView from "./components/EmortionView";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function Emortion(props){
    const [emortion, setEmortion] = useState();
    const {id:emortionId} = useParams();

    useState(()=>{
        axios.get(`/api/emortion/emortion/${emortionId}`).then((res)=>{
            setEmortion(res.data);
        })
    })

    return(
        <div>
            <div className="col-xl-7 col-lg-3 col-md-8 col-sm-12 post-panel">
                <EmortionView expanded={true} emortion={emortion}/>
            </div>
        </div>
    )
}