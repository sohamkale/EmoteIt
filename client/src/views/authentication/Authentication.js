import React, {useEffect} from 'react'
import './Authentication.scss'
import GoogleLogin from "../../components/authentication/GoogleLogin";
import axios from "axios";


export default function Authentication(props){

    useEffect(()=>{
        axios.get('/api/feedback').then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    })

    return (
        <>
            <GoogleLogin/>
        </>
    );
}